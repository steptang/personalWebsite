/* /public/angular-app/profile/profile-controller.js
- Displays user data information by GET from api
- Allows for user to change password or email, login required (POST to login) */

angular.module('console').controller('ProfileController', ProfileController);

function ProfileController($routeParams, $http, $window, AuthFactory, jwtHelper, sharedProperties){
	var vm = this;
	var id = $routeParams.id;

	/* Alert Modal -------------------------------------------------------------------------------------------------- */
	
	//get all relevant HTML elements
	vm.alertmodal = document.getElementById("alert-modal");
	vm.alertspan = document.getElementById("alertclose");
	vm.alertokbtn = document.getElementById("alert-ok-btn");
	vm.alerttitle = document.getElementById("alert-title");
	vm.alertmessage = document.getElementById("alert-message");

	//if click outside of modal, exit modal
	vm.alertspan.onclick = function() {
		vm.alertmodal.style.display = "none";
	}

	//if click on "OK" button, exit modal
	vm.alertokbtn.onclick = function() {
		vm.alertmodal.style.display = "none";
	}

	//create alert modal with input title and message
	function createAlert(title, message){
		vm.alerttitle.innerHTML = title;
		vm.alertmessage.innerHTML = message;
		vm.alertmodal.style.display = "block";
	}

	/* /Alert Modal ------------------------------------------------------------------------------------------------- */

	/* /Change Password Modal --------------------------------------------------------------------------------------- */
	
	//get all relevant HTML elements
	vm.editpwdbtn = document.getElementById("edit_password_button");
	vm.passwordmodal = document.getElementById("password-modal");
	vm.passwordspan = document.getElementById("passwordclose");
	vm.passwordokbtn = document.getElementById("password-ok-btn");
	vm.passwordtitle = document.getElementById("password-title");

	//trigger password modal when user clicks on editpwdbtn
	vm.editpwdbtn.onclick = function(){
		vm.passwordtitle.innerHTML = "Change User Password";
		vm.passwordmodal.style.display = "block";
	}

	//if click outside of modal, exit modal
	vm.passwordspan.onclick = function() {
		vm.passwordmodal.style.display = "none";
	}

	//if click on "OK" button
	vm.passwordokbtn.onclick = function() {
		//error checking
		if(!vm.oldpassword){
			createAlert("Error", "Please fill out old password.");
			return;
		}
		if(!vm.newpassword){
			createAlert("Error", "Please fill out new password.");
			return;
		}
		if(!vm.newpasswordrepeat){
			createAlert("Error", "Please repeat new password.");
			return;
		}
		if (vm.newpassword !== vm.newpasswordrepeat) {
			createAlert("Error", "Please make sure the passwords match.");
			return;
		}
		vm.loggedInUser = $window.localStorage.loggedInUser;
		if (vm.oldpassword) {
			    var user = {
				username: vm.loggedInUser,
				password: vm.oldpassword
			    };
			    //verify user credentials by logging in
			    $http.post('/api/users/login', user).then(function(response) {
				if (response.data.success) {
				    $window.sessionStorage.token = response.data.token;
				    AuthFactory.isLoggedIn = true;
				    var token = $window.sessionStorage.token;
				    var decodedToken = jwtHelper.decodeToken(token);
				    $window.localStorage.loggedInUser = decodedToken.username;
				    $window.localStorage.loggedInUserId = decodedToken.userid;
				    vm.loggedInUser = $window.localStorage.loggedInUser;
				    vm.loggedInUserId = $window.localStorage.loggedInUserId;
				    vm.isAdmin = decodedToken.admin;
				    if(vm.isAdmin){
						AuthFactory.isAdminLoggedIn = true;
				    }else{
						AuthFactory.isAdminLoggedIn = false;
				    }
				    //now that user is verified, change the password
				    changePassword(vm.loggedInUser);
				}
			    }).catch(function(error) {
					createAlert("Login Error", error.data);
					console.log(error);
			    })

		}
		vm.passwordmodal.style.display = "none";
	}

	//changes user's password on the mongoDB database
	function changePassword(input_username){
		//json object with new password
		var user = {
				username: input_username,
				password: vm.newpassword
			    };
		//POST to database to change password
		$http.post('/api/users/'+id+'/change-password', user).then(function(response){
			console.log(response.data);
			vm.getUser();
			createAlert("Successful", "Successfully updated user password.");
		}).catch(function(error) {
			createAlert("Error", error.data);
			console.log(error);
		})
	}

	/* /Change Password Modal --------------------------------------------------------------------------------------- */

	/* Change Email Modal ------------------------------------------------------------------------------------------- */

	//get all relevant HTML elements
	vm.editemailbtn = document.getElementById("edit_email_button");
	vm.emailmodal = document.getElementById("email-modal");
	vm.emailspan = document.getElementById("emailclose");
	vm.emailokbtn = document.getElementById("email-ok-btn");
	vm.emailtitle = document.getElementById("email-title");

	//trigger email modal when user clicks on editemailbtn
	vm.editemailbtn.onclick = function(){
		vm.emailtitle.innerHTML = "Change User Email";
		vm.emailmodal.style.display = "block";
	}

	//if click outside of modal, exit modal
	vm.emailspan.onclick = function() {
		vm.emailmodal.style.display = "none";
	}

	//if click on "OK" button, exit modal
	vm.emailokbtn.onclick = function() {
		//error checking
		if(!vm.newemail){
			createAlert("Error", "Please fill out new email. Make sure your email is @siemens-healthineers.com.");
			return;
		}
		if(!vm.newemailrepeat){
			createAlert("Error", "Please repeat new email. Make sure your email is @siemens-healthineers.com.");
			return;
		}
		if(!vm.oldemail){
			createAlert("Error", "Please fill out password.");
			return;
		}
		if (vm.newemail !== vm.newemailrepeat) {
			createAlert("Error", "Please make sure the emails match.");
			return;
		}
		vm.loggedInUser = $window.localStorage.loggedInUser;
		if (vm.oldemail) {
			    var user = {
				username: vm.loggedInUser,
				password: vm.oldemail
			    };

			    //verify user credentials by logging in
			    $http.post('/api/users/login', user).then(function(response) {
				if (response.data.success) {
				    $window.sessionStorage.token = response.data.token;
				    AuthFactory.isLoggedIn = true;
				    var token = $window.sessionStorage.token;
				    var decodedToken = jwtHelper.decodeToken(token);
				    $window.localStorage.loggedInUser = decodedToken.username;
				    $window.localStorage.loggedInUserId = decodedToken.userid;
				    vm.loggedInUser = $window.localStorage.loggedInUser;
				    vm.loggedInUserId = $window.localStorage.loggedInUserId;
				    vm.isAdmin = decodedToken.admin;
				    if(vm.isAdmin){
						AuthFactory.isAdminLoggedIn = true;
				    }else{
						AuthFactory.isAdminLoggedIn = false;
				    }
				    //now that user is verified, change email
				    changeEmail(vm.loggedInUser);
				}
			    }).catch(function(error) {
					createAlert("Login Error", error.data);
					console.log(error);
			    })

		}
		vm.emailmodal.style.display = "none";
	}

	//changes user's email on the mongoDB database
	function changeEmail(input_username){
		//json object with new email
		var user = {
				username: input_username,
				email: vm.newemail
			    };
		//POST to database to change email
		$http.post('/api/users/'+id+'/change-email', user).then(function(response){
			console.log(response.data);
			vm.getUser();
			createAlert("Successful", "Successfully updated user email.");
		}).catch(function(error) {
			createAlert("Error", error.data);
			console.log(error);
		})
	}

	/* /change Email Modal ------------------------------------------------------------------------------------------ */

	//make call to GET user
	vm.getUser = function(){
		$http.get('/api/users/'+id).then(function(response) {
			console.log(response.data);
			vm.user = response.data;
			console.log(vm.user);
		}).catch(function(error) {
			console.log(error);
			sharedProperties.setErrorMessage(error);
			sharedProperties.setErrorType(error);
			window.location.href = '/#!/error/500';
			return;
		});
	}

	vm.getUser();
}