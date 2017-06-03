var router=require('express').Router();
var auth=require('../modules/auth');
var user=require('../models/account');
var hub=require('../models/hub');
var template=require('../models/template');
var project=require('../models/project');
var jwt=require('jsonwebtoken');
//api for getting templates assigned for this project
router.get('/getMyTemplate',auth.auth,auth.checkProjectToken,function(req,res){
	project.projects.findById(req.projectdecode.hubname).populate('template').exec(function(err,template){
		if(err){
			res.send({'err':err});
		}
		else
		{
			res.send(template);
		}
	})
})
//api for adding new user to project
router.post('/addNewUser',auth.auth,auth.checkProjectToken,function(req,res){
	project.projects.findById(req.projectdecode.hubname,function(err,project){
		if(err)
		{
			res.send({'err':err})
		}
		else
		{
			if(project.owner==req.decode.username)
			{
				project.user.push({user:req.body.id,aC:req.body.ac});
				project.save();
				var tokendata={projectid:project._id,userid:req.body.id,accesslevel:req.body.ac}
				var token=jwt.sign(tokendata,process.env.SECRET,{});
				user.User.findById(req.body.id,function(err,result){
					if(err){
						res.send({'error':err})
					}
					else
					{
						console.log(result);
						result.token.push({token:token,pid:project._id});
						result.save(function(err,result){
							if(err){
								res.send({'error':err})
							}
							else
							{
								res.send({'modification':'you added user with id'+req.body.id+'to the project'+project._id})
							}
						})
					}
				})
			}
			else{
				res.send({'error':'You are not the owner of the project'})
			}
		}
	})
})
//api for deactivating project
router.get('/deactivateproject',auth.auth,auth.checkProjectToken,function(req,res){
	project.projects.findById(req.projectdecode.hubname,function(err,project){
		if(err)
		{
			res.send({'error':err})
		}
		else
		{
			if(project.activated==true)
			{
				project.activated=false;
				project.save(function(err,result){
					if(err)
					{
						res.send({'error':err})
					}
					else{
						res.send({'project status':'project with name '+project.name+' deactivated'})
					}
				})
			}
			else{
				res.send({'status':'project already in deactivation'})
			}
		}
	})
})
//api for activating project
router.get('/activateproject',auth.auth,auth.checkProjectToken,function(req,res){
	project.projects.findById(req.projectdecode.hubname,function(err,project){
		if(err){
			res.send({'error':err})
		}
		else{
			if(project.activated==false)
			{
				project.activated=true;
				project.save(function(err,result){
					if(err)
					{
						res.send({'error':err})
					}
					else{
						res.send({'project status':'project with name '+project.name+' activated'})
					}
				})
			}
			else
			{
				res.send({'project status':'project already in activation'})
			}
		}
	})
})
//api for deleting data from the project
router.get('/deletedata/:id',auth.auth,auth.checkProjectToken,function(req,res){
	hub.delete(req.projectdecode.hubname,req.params.id,function(err,result){
		if(err){
			res.send({'error':err})
		}
		else
		{
			res.send({'result':result});
		}
	})
})
module.exports=router;