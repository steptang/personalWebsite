/* public/angular-app/register/register-controller.js
- checks for errors in the form
- makes a post request to register user if no errors */

angular.module('console').controller('RegisterController', RegisterController);

function RegisterController($http, sharedProperties) {
	var vm = this;

	//function to create a json object for the user
	vm.register = function() {
		var user = {
			username: vm.username,
			password: vm.password,
			name: vm.name,
			email: vm.email,
			admin: false,
			register: false
		};

		//error checks on the form
		if(!vm.name){
			vm.error = 'Please add a name.';
		}else if(!vm.username){
			vm.error = 'Please add a username.';
		}else if(!vm.email){
			vm.error = 'Please add a email.';
		}else if (!vm.password) {
			vm.error = 'Please add a password.';
		} else {
			if (vm.password !== vm.passwordRepeat) {
				vm.error = 'Please make sure the passwords match.';
			} else {
				//post request to api to register user
				$http.post('/api/users/register', user).then(function(result) {
					console.log(result);
					vm.message = 'Successful registration, please wait for an admin to approve your registration before logging in.';
					vm.error = '';
				}).catch(function(error) {
					console.log(error);
					sharedProperties.setErrorMessage(error);
        			sharedProperties.setErrorType(error);
        			window.location.href = '/#!/error/500';
        			return;
				});
			}
		}
	}
};