/* /public/angular-app/app.js
- includes all dependencies for the module
- lists all routes for the angular app
- integrates authentication to restrict certain pages */

angular.module('console', ['ngRoute',  'smart-table', 'angular-jwt', 'ngCookies'])
.config(config).run(run);

function config($httpProvider, $routeProvider) {
	//add AuthInterceptor to manage authentication each time switch between paths
	$httpProvider.interceptors.push('AuthInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/main-page/main.html',
			controller: MainController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/about-me', {
			templateUrl: 'angular-app/about-me/about-me.html',
			controller: AboutMeController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/projects', {
			templateUrl: 'angular-app/projects/projects.html',
			controller: ProjectsController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/programming', {
			templateUrl: 'angular-app/programming/programming.html',
			controller: ProgrammingController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/hardware', {
			templateUrl: 'angular-app/hardware/hardware.html',
			controller: HardwareController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/community', {
			templateUrl: 'angular-app/community/community.html',
			controller: CommunityController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/art', {
			templateUrl: 'angular-app/art/art.html',
			controller: ArtController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/honors-awards', {
			templateUrl: 'angular-app/womens-empowerment/womens-empowerment.html',
			controller: WomensController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/projects/:id', {
			templateUrl: 'angular-app/project-display/project-display.html',
			controller: ProjectController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.when('/error/:errorid', {
			templateUrl: 'angular-app/error-page/error.html',
			controller: ErrorController,
			controllerAs: 'vm',
			access: {
				user_restricted: false,
				admin_restricted: false
			}
		})
		.otherwise('/error/404');
}

//If authentication from AuthFactory does not show admin logged in when admin_restricted or does not show user logged in when user_restricted, prevents access and redirects to homepage
function run($rootScope, $location, $window, AuthFactory) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if(nextRoute.access !== undefined && nextRoute.access.admin_restricted && !window.sessionStorage.token && !AuthFactory.isAdminLoggedIn) {
			event.preventDefault();
			$location.path('/');
		}
		if(nextRoute.access !== undefined && nextRoute.access.user_restricted && !window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			event.preventDefault();
			$location.path('/');
		}
	})
}