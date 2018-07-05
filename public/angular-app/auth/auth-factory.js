/* /public/angular-app/auth/auth-factory
- stores whether user is logged in in auth
- stores whether admin is logged in in auth */

angular.module('console').factory('AuthFactory', AuthFactory);

function AuthFactory() {
	//returns json format of variable
	return {
		auth: auth,
	};

	//stores two variables based on if user is logged in and if admin is logged in
	var auth = {
		isLoggedIn: false,
		isAdminLoggedIn: false
	};
}