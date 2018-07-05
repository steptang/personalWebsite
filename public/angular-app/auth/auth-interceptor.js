/* /public/angular-app/auth/auth-interceptor 
- checks token to see if user is logged in
- checks token to see if admin is logged in
- blocks path if not authenticated and redirects to main page */

angular.module('console').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory, jwtHelper) {
	return {
		request: request,
		response: response,
		responseError: responseError
	};

	function request(config) {
		config.headers = config.headers || {};
		if ($window.sessionStorage.token) {
			config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
		}
		return config;
	}

	function response(response) {
		if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			AuthFactory.isLoggedIn = true;
			var token = $window.sessionStorage.token;
			var decodedToken = jwtHelper.decodeToken(token);
			var isAdmin = decodedToken.admin;
			if(isAdmin){
				AuthFactory.isAdminLoggedIn = true;
			}else{
				AuthFactory.isAdminLoggedIn = false;
			}
		}
		if (response.status === 401) {
			AuthFactory.isLoggedIn = false;
			AuthFactory.isAdminLoggedIn = false;
		}
		return response || $q.when(response);
	}

	function responseError(rejection) {
		if (rejection.status === 401 || rejection.status === 403) {
			delete $window.sessionStorage.token;
			AuthFactory.isLoggedIn = false;
			AuthFactory.isAdminLoggedIn = false;
			$location.path('/');
		}
		return $q.reject(rejection);
	}
}
