/* /public/angular-app/manage-users/user-controller.js
- displays a list of users and information from GET request to database
- allows for admin to approve registration and make other admins */

angular.module('console').controller('UserController', UserController);

function UserController($http, $window) {
	var vm = this;

	//set global variables
	vm.title = "Manage Users";
	vm.users = [];
	vm.rowCollection = [];

	/* Alert Modal ---------------------------------------------------------------------------------------------------- */

	//get relevant HTML elements
	vm.alertmodal = document.getElementById("alert-modal");
	vm.alertspan = document.getElementById("alertclose");
	vm.alertokbtn = document.getElementById("alert-ok-btn");
	vm.alerttitle = document.getElementById("alert-title");
	vm.alertmessage = document.getElementById("alert-message");

	// When the user clicks outside of modal, close the modal
	vm.alertspan.onclick = function() {
		vm.alertmodal.style.display = "none";
	}

	//When the user clicks on the "OK" button, close the modal
	vm.alertokbtn.onclick = function() {
		vm.alertmodal.style.display = "none";
	}

	//function to create the alert
	function createAlert(title, message){
		vm.alerttitle.innerHTML = title;
		vm.alertmessage.innerHTML = message;
		vm.alertmodal.style.display = "block";
	}

	/* /Alert Modal -------------------------------------------------------------------------------------------------- */

	/* Button Bar ---------------------------------------------------------------------------------------------------- */

	//get relevant HTML elements
	vm.approvebtn = document.getElementById("approve_button");
	vm.makeadminbtn = document.getElementById("make_admin_button");
	vm.removebtn = document.getElementById("remove_user_button");
	vm.refreshbtn = document.getElementById("refresh_button");

	//when user clicks on approvebtn, trigger the approve function
	vm.approvebtn.onclick = function() {
		var selected = vm.users.filter(function(item){
			return item.isSelected === true;
		});
		if(selected[0].registered){
			createAlert("Invalid Request", "User registration is already approved. Please select a user whose registration has not been approved to approve registration.");
			return;
		}
		console.log(selected);
		console.log(selected[0].username);
		approve(selected[0].username);
	}

	//when user clicks on the makeadminbtn, trigger the approve admin function
	vm.makeadminbtn.onclick = function() {
		if(confirm("Are you sure you want to make this user an admin? This will give the user access to the Manage Users page. You will no longer be able to edit this user's access rights. This action cannot be undone.") == true){
			var selected = vm.users.filter(function(item){
				return item.isSelected === true;
			});
			if(selected[0].admin){
				createAlert("Invalid Request", "User registration is already an admin. Please select a user who is not an admin to make an admin.");
				return;
			}
			console.log(selected);
			console.log(selected[0].username);
			makeAdmin(selected[0].username);
		}
	}

	//when user clicks on the removebtn, trigger the deleteUser function
	vm.removebtn.onclick = function() {
		if(confirm("Are you sure you want to unregister this user? The user will no longer be able to log in and will not have access to the console.") == true){
			var selected = vm.users.filter(function(item){
				return item.isSelected === true;
			});
			if(!selected[0].registered){
				createAlert("Invalid Request", "User is already unregistered. Please select a user whose registration has been approved to remove registration.");
				return;
			}
			if(selected[0].admin){
				createAlert("Invalid Request", "User is an admin. Unable to alter states of other admin.");
				return;
			}
			console.log(selected);
			console.log(selected[0].username);
			deleteUser(selected[0].username);
		}
	}

	//when user clicks on the refreshbtn, reload the table
	vm.refreshbtn.onclick = function() {
		vm.loadUsersTable();
	}

	//approves selected user and reload table
	function approve(input_username){
		var input = {
			username: input_username,
			registered: true
		}
		$http.post('/api/users/admin-register', input).then(function(response) {
			console.log(response.data);
			vm.loadUsersTable();
		createAlert("Successful!", "Successfully approved " + input_username + "'s registration.");
	  }).catch(function(error) {
		console.log(error);
	  })
	}

	//un-approves selected user and reload table
	function deleteUser(input_username){
		var input = {
			username: input_username,
			registered: false
		}
		$http.post('/api/users/admin-register', input).then(function(response) {
			console.log(response.data);
			vm.loadUsersTable();
		createAlert("Successful!", "Successfully unregistered " + input_username + ".");
	  }).catch(function(error) {
		console.log(error);
	  })
	}

	//make selected user an admin
	function makeAdmin(input_username){
		var input = {
			username: input_username,
			registered: true,
			admin: true
		}
		$http.post('/api/users/admin-register', input).then(function(response) {
			console.log(response.data);
			vm.loadUsersTable();
		createAlert("Successful!", "Successfully made " + input_username + " an admin.");
	  }).catch(function(error) {
		console.log(error);
	  })
	}

	/* /Button Bar --------------------------------------------------------------------------------------------------- */

	/* Users Table --------------------------------------------------------------------------------------------------- */

	vm.loadUsersTable = function() {
		$http.get('/api/users/users').then(function(response) {
			console.log(response.data);
			vm.users = response.data;
			console.log(vm.users);
			vm.rowCollection = response.data;
		}).catch(function(error) {
			console.log(error);
		});
	}
	vm.loadUsersTable();

	/* /Users Table -------------------------------------------------------------------------------------------------- */
	
}
