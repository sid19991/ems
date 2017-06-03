var express = require('express');
var router = express.Router();
var useri=require('../models/account');
var dyna=require('../models/hub');
var jwt=require('jsonwebtoken');
var passport=require('passport');

var LocalStrategy=require('passport-local').Strategy;
/* GET home page. */
passport.use(new LocalStrategy(
  function(username, password, done) {
    useri.User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      if(user.password==password)
      {
      	return done(null,user);
      }
      else
      {
      	return done(null,false,{message:"incorrect password"});
      }
      
      
    });
  }
));


router.post('/register',function(req,res){
	useri.User.findOne({username:req.body.username,password:req.body.password},
		function(err,result){
		if(result){
			res.send("username and password pair already in use");

		}
		else
		{
			useri.createUser(new useri.User({username:req.body.username,password:req.body.password,name:req.body.name,email:req.body.email}),
				function(err,result){
					if(!err){
						res.send(result);
					}
				})
		}
	});

});
var v=function(req,res){
	useri.User.findOne({username:req.body.username,password:req.body.password},function(err,user){
		if(!err)
		{
			if(req.body.username=="test100" && req.body.password=="test100")
				{
					var userdata={
       			username:user.username,
       			uid:user._id,
       			admin:"Yes"
       		}
       	}
       	else{
       		var userdata={
       			username:user.username,
       			uid:user._id,
       			admin:"NO"
       		}
       	}
       		var token=jwt.sign(userdata,process.env.SECRET,{
       			expiresIn:"1h"
       		});
            res.json({
            	success:true,
            	token:token
            });
		}
		else{
			res.send('error occured');
		}
	});
};
router.post('/login', passport.authenticate('local', {}),v);
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Employee.Employee.findBy_Id(id, function (err, user) {
    done(err, user._id);
  });
});
module.exports = router;
