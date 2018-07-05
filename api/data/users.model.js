/* /api/data/users.model.js
- creates a Model for users in json format to be stored in mongoDB database */

//Imports & Dependencies
var mongoose = require('mongoose');

//creates the schema specifying json format of a user
var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	registered: {
		type: Boolean,
		required: true
	}
});

//exports the schema as the User model
mongoose.model('User', userSchema);
