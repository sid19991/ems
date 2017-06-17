var express = require('express');
var path = require('path');
var jwt=require('jsonwebtoken');
var passport=require('passport');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var routes = require('./routes/index');
var user = require('./routes/user');
var app = express();
var admin=require('./routes/admin');
var project=require('./routes/projects');
var hub=require('./routes/hub');
var log=require('./models/log');
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb://sid:4Ed9hBn6CWQAbu@ds157641.mlab.com:57641/dynamictables');
var db=mongoose.connection;
db.on('connected',function(err){
    console.log(err);
    console.log('connected');
});
// view engine setup
process.env.SECRET='hubmanage';
app.use(favicon());

app.use(function(req,res,next){
	req.decode=null;
	req.projectdecode=null;
	next();
})
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
	var ip=req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	 //console.log({'ip':ip,'api':req.url,'headers':req.headers});
	 var login=new log.log({ip:ip,api:req.url,headers:req.headers})
	 login.save(function(err,result){
	 	if(err)
	 	{
	 	//	console.log({'error':err})
	 	}
	 	else{
	 	//	console.log({'status':result})
	 	}
	 })
	 next();
	 
})
app.use('/', routes);
app.use('/users', user);
app.use('/admin',admin);
app.use('/project',project);
app.use('/hub',hub);
module.exports = app;
