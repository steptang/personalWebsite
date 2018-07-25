/* /public/angular-app/login/login-controller.js
- takes input username and password and attempts login
- triggers alert modals if username and password were not correct, user registration was not yet approved, etc. */

angular.module('console').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper, $cookies) {
	var vm = this;

	
	// //store username and ID for dynamically changing "Welcome" in navigation bar and for accessing profile with correct user ID
	// vm.loggedInUser = $window.localStorage.loggedInUser;
	// vm.loggedInUserId = $window.localStorage.loggedInUserId;

	// //checks if user is logged in
	// vm.isLoggedIn = function() {
	// 	if (AuthFactory.isLoggedIn) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	// //checks if user logged in is an admin
	// vm.isAdminLoggedIn = function() {
	// 	if (AuthFactory.isAdminLoggedIn) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	// /* Alert Modal ----------------------------------------------------------------------------------------------------- */
	// //get relevant HTML elements
	// vm.alertmodal = document.getElementById("alert-modal");
	// vm.alertspan = document.getElementById("alertclose");
	// vm.alertokbtn = document.getElementById("alert-ok-btn");
	// vm.alerttitle = document.getElementById("alert-title");
	// vm.alertmessage = document.getElementById("alert-message");

	// //when the user clicks outside of modal, close the modal
	// vm.alertspan.onclick = function() {
	// 		vm.alertmodal.style.display = "none";
	// }

	// //when the user clicks on the "OK" button, close the modal
	// vm.alertokbtn.onclick = function() {
	// 	vm.alertmodal.style.display = "none";
	// }

	// //trigger the alert modal
	// function createAlert(title, message){
	// 	vm.alerttitle.innerHTML = title;
	// 	vm.alertmessage.innerHTML = message;
	// 	vm.alertmodal.style.display = "block";
	// }

	// /* /Alert Modal ---------------------------------------------------------------------------------------------------- */

	// //logs user in based on form inputs
	// vm.login = function() {
	// 	if (vm.username && vm.password) {
	// 		//create json object from form objects
	// 		var user = {
	// 			username: vm.username,
	// 			password: vm.password
	// 		};
	// 		//make POST request to the api gateway
	// 		$http.post('/api/users/login', user).then(function(response) {
	// 			if (response.data.success) {
	// 				var completed = $cookies.getObject("completed");
	// 				if(completed){

	// 				}else{
	// 						location.reload();
	// 				}
	// 				$window.sessionStorage.token = response.data.token;
	// 				//set AuthFactory accordingly
	// 				AuthFactory.isLoggedIn = true;
	// 				//get token and decode relevant information
	// 				var token = $window.sessionStorage.token;
	// 				var decodedToken = jwtHelper.decodeToken(token);
	// 				vm.isAdmin = decodedToken.admin;
	// 				//store username and id
	// 				$window.localStorage.loggedInUser = decodedToken.username;
	// 				$window.localStorage.loggedInUserId = decodedToken.userid;
	// 				//update local variables
	// 				vm.loggedInUser = $window.localStorage.loggedInUser;
	// 				vm.loggedInUserId = $window.localStorage.loggedInUserId;
	// 				if(vm.isAdmin){
	// 					console.log(AuthFactory.isAdminLoggedIn);
	// 					//set AuthFactory accordingly
	// 					AuthFactory.isAdminLoggedIn = true;
	// 					console.log(AuthFactory.isAdminLoggedIn); 
	// 				}else{
	// 					//set AuthFactory accordingly
	// 					AuthFactory.isAdminLoggedIn = false;
	// 				}
	// 			}
	// 		}).catch(function(error) {
	// 			createAlert("Login Error", error.data);
	// 			console.log(error);
	// 		})

	// 	}
	// };

	// vm.logout = function() {
	// 	//set AuthFactory accordingly
	// 	AuthFactory.isLoggedIn = false;
	// 	AuthFactory.isAdminLoggedIn = false;
	// 	//update local Storage
	// 	$window.localStorage.loggedInUser = "";
	// 	$window.localStorage.loggedInUserId = "";
	// 	//delete token
	// 	delete $window.sessionStorage.token;
	// 	//redirect to main page
	// 	$location.path('/');
	// };
}
