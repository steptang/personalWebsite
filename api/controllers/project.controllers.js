/* /api/controllers/users.controllers.js
- contains all functions for the router endpoints: register user, login, approve user, etc.
- contains token authentication method to conceal certain endpoints */

//Imports & Dependencies
var mongoose = require('mongoose');
var Project     = mongoose.model('Project');

module.exports.projectGetAll = function(req, res) {
	//find all projects
	Project
		.find()
		.exec(function(err, projects){
			console.log(err);
			console.log(projects);
			if(err) {
				console.log("Error finding projects");
				res
					.status(400)
					.json(err);
			}else {
				console.log("Found projects", projects.length);
				res
					.json(projects);
			}
		});
};

module.exports.projectGetOne = function(req, res) {
	//get all information from the inputs:
	var projectId = req.params.projectId;

	//find user with given userId
	Project
		.findById(projectId)
		.exec(function(err, project) {
			var response = {
				status : 200,
				message : project
			};
			if (err) {
				console.log("Error finding project");
				response.status = 400;
				response.message = err;
			} else if(!project) {
				console.log("Project not found in database", projectId);
				response.status = 401;
				response.message = {
					"message" : "Username not found " + projectId
				};
			}
			res
				.status(response.status)
				.json(response.message);
		});
};