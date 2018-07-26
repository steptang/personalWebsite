/* /app.js
- sets up the server port
- handles error pages
- adds the favicon
- starts the server
- requires all other api files to be set up */

//Imports & Dependencies
require('./api/data/db.js');
var routes = require('./api/routes');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

//set port to localhost:3000
app.set('port', 8080);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

//include node modules and set base directory to public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//include the bodyParse to parse urls and parse json
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

//set up the routes
app.use('/api', routes);

// // Handle 404
// app.use(function(req, res) {
//  res.send('404: Page not Found', 404);
// });

// // Handle 500
// app.use(function(error, req, res, next) {
//  res.send('500: Internal Server Error', 500);
// });

//set up favicon
app.use(favicon(path.join(__dirname, 'public', '/images/favicon.png')))

//start the server
//var server = app.listen(app.get('port'), function(){
var server = app.listen(process.env.PORT || app.get('port'), function(){
	var port = server.address().port;
	console.log('Magic happens on port ' + port);
});

//var server = app.listen(process.env.PORT || app.get('port'), function(){

