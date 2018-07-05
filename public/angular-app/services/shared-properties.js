/* /public/angular-app/services/shared-properties.js
- shares error message among controllers to enable display of error message on the error page */

angular.module('console').service('sharedProperties', function () {
		var errorMessage = "";
		var errorType = "";
		return {
			getErrorMessage: function () {
				return errorMessage;
			},
			setErrorMessage: function(value) {
				errorMessage = value;
			},
			getErrorType: function () {
				return errorType;
			},
			setErrorType: function(value) {
				errorType = value;
			}
		};
	});