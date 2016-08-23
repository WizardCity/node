var express = require('express');
// var path = require('path');
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/WebSite');

var app = express();

//Make our db accessible to our router
// app.use(function(req,res,next){
// 	req.db = db;
// 	next();
// });

app.use(express.static(__dirname + '/client'));
app.use('/js', express.static(__dirname + '/client/js'));

app.get('/', function(req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});

app.get('/about', function(req, res){
	res.sendfile(__dirname + '/client/views/about.html');
});

app.get('/future_projects', function(req, res){
	res.sendfile(__dirname + '/client/views/future_projects.html');
});

app.get('/contact', function(req, res){
	res.sendfile(__dirname + '/client/views/contact.html');
});

app.get('/login', function(req, res){
	res.sendfile(__dirname + '/client/views/login.html');
});

app.get('/register', function(req, res){
	res.sendfile(__dirname + '/client/views/register.html');
});
	
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
