/* /public/angular-app/navigation-directive.js
- creates a directive for navigation bar */

angular.module('console').directive('mhNavigation', mhNavigation);

function mhNavigation() {
	return {
		restrict: 'E',
		templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
	};
}
