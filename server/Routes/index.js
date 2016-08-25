var express 	= require('express'),
 	router 		  = express.Router(),
	mongoose 	  = require('mongoose'),
  jwt         = require('express-jwt'),
  passport    = require('passport'),
	User 		    = mongoose.model('User');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// router.use(function(req, res, next){
// 	console.log(req.method, req.url);

// 	next();
// });

router.get('/', function(req, res){
	res.sendfile('./client/views/index.html');
});

router.get('/about', function(req, res){
	res.sendfile('./client/views/about.html');
});

router.get('/future_projects', function(req, res){
	res.sendfile('./client/views/future_projects.html');
});

router.get('/contact', function(req, res){
	res.sendfile('./client/views/contact.html');
});

router.get('/login', function(req, res){
	res.sendfile('./client/views/login.html');
});

router.get('/register', function(req, res){
	res.sendfile('./client/views/register.html');
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
module.exports = router;