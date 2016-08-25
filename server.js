var express 		= require('express'),
	app 			= express(),
	mongoose 		= require('mongoose'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	morgan 			= require('morgan'),
	database 		= require('./server/config/database'),
	passport 		= require('passport');

var router = express.Router();
// var path = require('path');
// var gulp = require('gulp');
// var concat = require('gulp-concat');

// Connect to mongodb
mongoose.connect(database.url);

app.use(express.static(__dirname + '/client'));					// set the static files location /client/images will be /images
app.use('/js', express.static(__dirname + '/client/js'));		// set the static files location /js will be /client/js
app.use(passport.initialize());
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


require('./server/models/Users');
require('./server/config/passport');

// Router for Webpages
urlRoutes= require('./server/Routes/index'),
app.use(require('./server/Routes'));



//Connecting to network at post|8081	
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
