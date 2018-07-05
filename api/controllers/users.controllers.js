/* /api/controllers/users.controllers.js
- contains all functions for the router endpoints: register user, login, approve user, etc.
- contains token authentication method to conceal certain endpoints */

//Imports & Dependencies
var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

//For creating user in the MongoDB database that is not an admin and is not registered (pending approval by an admin)
//inputs (in json format): username (required), name, email, password (required)
//outputs: none
//throws: 
//  - error in creating user in User Model in MongoDB database (400 status)
module.exports.register = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var name = req.body.name || null;
	var email = req.body.email || null;
	var password = req.body.password;
	var admin = false;
	var registered = false;

	//create user that is not admin and not registered using the User Model
	User.create({
		username: username,
		name: name,
		password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
		admin: admin,
		email: email,
		registered: registered
	}, function(err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('user created', user);
			res.status(201).json(user);
		}
	});
};

//For logging in user by comparing input credentials with user data in the MongoDB database and creating a token (expires in one hour) to be passed to the front-end
//inputs (in json format): username, password
//outputs: none
//throws:
//  - error in finding user in User Model in MongoDB database (400 status)
//  - error when user registration is not approved (401 status)
//  - error when password is incorrect (401 status)
//  - error when username is not in the system (401 status)
module.exports.login = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var password = req.body.password;

	//find user from given username and check if provided password is correct
	User.findOne({
		username: username
	}).exec(function(err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			if (user) {
					if (bcrypt.compareSync(password, user.password)) {
						console.log('User found', user);
						if(user.registered){
							var token = jwt.sign({ username: user.username, admin: user.admin, userid: user._id }, 's3cr3t', { expiresIn: 3600 });
							res.status(200).json({success: true, token: token});
						} else {
							res.status(401).json('Sorry, your user registration has not yet been approved by an admin.');
						}
					} else {
						res.status(401).json('Sorry, we did not recognize your username and password combination. Please try again with a correct username and password.');
					}
			} else {
					res.status(401).json('Sorry, we did not recognize your username in our system. Please try again with a correct username.');
			}
		}
	});
};

//For making a user an admin, sets the user to registered and as an admin role
//input (in json format): username
//output: none
//throws:
//  - error when user is not found by username in mongoDB database (status 400)
module.exports.adminRegister = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var admin = req.body.admin;
	var query = { username: username};
	var registered = req.body.registered;

	//find user from given username and change to registered and admin
	User.findOneAndUpdate(
		query, {registered: registered, admin: admin}, function(err, user){
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('User found', user);
			res.status(201).json(user);
		}
	});
};

//For changing a user password, sets the user password to input password
//input (in json format): username, password
//output: none
//throws:
//  - error when user is not found by username in mongoDB database (status 400)
module.exports.usersChangePassword = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var query = { username: username};
	var password = req.body.password;

	//find user from given username and change password to given password
	User.findOneAndUpdate(
		query, {password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))}, function(err, user){
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('User found', user);
			res.status(201).json(user);
		}
	});
};

//For changing a user email, sets the user email to input email
//input (in json format): username, password
//output: none
//throws:
//  - error when user is not found by username in mongoDB database (status 400)
module.exports.usersChangeEmail = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var query = { username: username};
	var email = req.body.email;

	//find user from given username and change email to given email
	User.findOneAndUpdate(
		query, {email: email}, function(err, user){
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('User found', user);
			res.status(201).json(user);
		}
	});
};

//For logging in only admin by comparing input credentials with data from mongoDB database and checks if the user is an admin
//input (in json format): username, password
//output: none
//throws:
//  - error in finding user in User Model in MongoDB database (400 status)
//  - error when user registration is not approved (401 status)
//  - error when password is incorrect (401 status)
//  - error when username is not in the system (401 status)
//  - error when user is not an admin (401 status)
module.exports.adminLogin = function(req, res) {
	//get all information from the inputs:
	var username = req.body.username;
	var password = req.body.password;

	//find user from given username and check if user is an admin
	User.findOne({
		username: username
	}).exec(function(err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			if (bcrypt.compareSync(password, user.password)) {
				console.log('User found', user);
				if(user.registered){
					if(user.admin){
						var token = jwt.sign({ username: user.username, admin: user.admin, userid: user._id }, 's3cr3t', { expiresIn: 3600 });
						res.status(200).json({success: true, token: token});
					}else{
						res.status(401).json('Not Admin Role');
					}
				}else {
					res.status(401).json('User Not Approved By Admin');
				}
			} else {
				res.status(401).json('Unauthorized');
			}
		}
	});
};

//For getting a json format list of all users in the system, including all user information (password encrypted)
//inputs: none
//outputs (in json format): all users and user information stored in mongoDB
//throws:
//  - error when users cannot be found on mongoDB database (status 400)
module.exports.usersGetAll = function(req, res) {
	//find all users
	User
		.find()
		.exec(function(err, users){
			console.log(err);
			console.log(users);
			if(err) {
				console.log("Error finding users");
				res
					.status(400)
					.json(err);
			}else {
				console.log("Found users", users.length);
				res
					.json(users);
			}
		});
};

//For getting a json format list of one user, including all user information (password encrypted)
//inputs: userId
//outputs (in json format): user information of inputted userId
//throws:
//  - error when user cannot be found on mongoDB database (status 400)
//  - error when username is not in mongoDB database (status 401)
module.exports.usersGetOne = function(req, res) {
	//get all information from the inputs:
	var userId = req.params.userId;

	//find user with given userId
	User
		.findById(userId)
		.exec(function(err, user) {
			var response = {
				status : 200,
				message : user
			};
			if (err) {
				console.log("Error finding user");
				response.status = 400;
				response.message = err;
			} else if(!user) {
				console.log("User not found in database", userId);
				response.status = 401;
				response.message = {
					"message" : "Username not found " + userId
				};
			}
			res
				.status(response.status)
				.json(response.message);
		});
};

//For authentication of a registered user, only succeeds with input token is a valid user
//inputs: userId, authorization in header
//outputs: returns with next(); to allow for next function to run if authentication passes
//throws:
//  - error when token is not correct (status 401)
//  - error when user id of token is not the same as input user id (status 401)
//  - error when no token is provided (status 403)
module.exports.authenticate = function(req, res, next) {
	//get all information from the inputs:
	var reqUserId = req.params.userId;
	var headerExists = req.headers.authorization;

	//decode the token to check if user id from token is equal to user id from input
	if (headerExists) {
		var token = req.headers.authorization.split(' ')[1]; //--> Authorization: Bearer xxx
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if (error) {
				console.log(error);
				res.status(401).json('Sorry, you are not logged in or your registration has not been approved.');
			} else {
				req.userId = decoded.userid;
				if (req.userId === reqUserId){
					next();
				} else {
					res.status(401).json("Sorry, users may only access their own profile.");
				}
			}
		});
	} else {
		res.status(403).json('Internal Service Error: No token provided');
	}
};

//For authentication of a registered admin, only succeeds with input token is a valid admin
//inputs: authorization in header
//outputs: returns with next(); to allow for next function to run if authentication passes
//throws:
//  - error when token is not correct (status 401)
//  - error when user id of token is not an admin
//  - error when no token is provided (status 403)
module.exports.adminAuthenticate = function(req, res, next) {
	//get all information from the inputs:
	var headerExists = req.headers.authorization;

	//decode the token to check if user from decoded token is an admin
	if (headerExists) {
		var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
		jwt.verify(token, 's3cr3t', function(error, decoded) {
			if (error) {
				console.log(error);
				res.status(401).json('Sorry, you are not logged in or your registration has not been approved.');
			} else {
				req.user = decoded.username;
				req.admin = decoded.admin;
				if(req.admin){
						next();
				} else {
						res.status(401).json('Sorry, you are not logged in as an admin.');
				}
			}
		});
	} else {
		res.status(403).json('Internal Service Error: No token provided');
	}
};
