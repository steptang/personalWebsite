/* /public/angular-app/error-page/error-page-controller.js
- gets the id from the request to the route
- sets error messages based on sharedProperties's error message and error type */

angular.module('console').controller('ErrorController', ErrorController);

function ErrorController($routeParams, sharedProperties) {
	
	var vm = this;
	var id = $routeParams.errorid;

	//sets error message for 404 page not found
	if(id === "404"){
		sharedProperties.setErrorMessage("This page does not exist!");
		sharedProperties.setErrorType("Page Not Found");
	}
	
	//set title based on id
	vm.title = "ERROR " + id;
	vm.subtitle = "Oops! There seems to be an error with your request.";

	//set local variables based on sharedProperties (error messages stored by this or other controllers)
	vm.errorMessage = sharedProperties.getErrorMessage();
	vm.errorType = sharedProperties.getErrorType();
	sharedProperties.setErrorMessage("");
	sharedProperties.setErrorType("");
}