/* /api/routes/index.js
- contains all routing to access methods from the users.controllers.js file
- employs authentication from users.controllers.js file to restrict access to certain endpoints (prevent data breaches, such as through Postman) */

//Imports & Dependencies
var express = require('express');
var router = express.Router();

//require methods from the users.controllers.js file
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlProject = require('../controllers/project.controllers.js');

//No Authentication Required
router
	.route('/users/register')
	.post(ctrlUsers.register);

router
	.route('/users/login')
	.post(ctrlUsers.login);

router
	.route('/users/admin-login')
	.post(ctrlUsers.adminLogin);

//Requires Admin Authentication (admin logged in)
router
	.route('/users/admin-register')
	.post(ctrlUsers.adminAuthenticate, ctrlUsers.adminRegister);

router
	.route('/users/users')
	.get(ctrlUsers.adminAuthenticate, ctrlUsers.usersGetAll);

//Requires User Authentication (logged in)
router
	.route('/users/:userId')
	.get(ctrlUsers.authenticate, ctrlUsers.usersGetOne);

router
	.route('/users/:userId/change-email')
	.post(ctrlUsers.authenticate, ctrlUsers.usersChangeEmail);

router
	.route('/users/:userId/change-password')
	.post(ctrlUsers.authenticate, ctrlUsers.usersChangePassword);

//Project
router
	.route('/projects/')
	.get(ctrlProject.projectGetAll);

router
	.route('/projects/:projectId/')
	.get(ctrlProject.projectGetOne);

//export to server file
module.exports = router;
