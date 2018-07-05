/* /api/data/db.js
- sets up connection to the database */

//Imports & Dependencies
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/personalPage';
var retry = null;

//connect to the dburl
mongoose.connect(dburl);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS: To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
}

// FOR NODEMON RESTARTS
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// FOR APP TERMINATION
process.on('SIGINT', function() {
	gracefulShutdown('App termination (SIGINT)', function() {
		process.exit(0);
	});
});
// FOR HEROKU TERMINATION
process.on('SIGTERM', function() {
	gracefulShutdown('App termination (SIGTERM)', function() {
		process.exit(0);
	});
});

// BRING IN SCHEMAS & MODELS
require('./users.model');
require('./project.model');
