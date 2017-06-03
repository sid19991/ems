//dependencies
var router=require('express').Router();
var jwt=require('jsonwebtoken');
var projects=require('../models/project');
var auth=require('../modules/auth');
var dyna=require('../models/hub')
var admin={};
var template=require('../models/template')
var user=require('../models/account')
var project=require('../models/project');
//function for giving permission
var givegrant=function(projectdetails,callback){
	projects.projects.findOne({
		_id:projectdetails.id
	},function(err,project){
		console.log(project);
		var token=jwt.sign({
			name:project.name,
			hubname:project._id},process.env.SECRET,{});
		projects.projects.update({_id:project._id},{$set:{token:token,hubname:project._id}},function(err,result){console.log(result)});
		callback(null,project);
		}
	)}
//function for checking if admin is logged in
var checkadmin=function(req,res,callback){
	console.log(req.decode.admin)
	if(req.decode.admin=="Yes"){
		var projectdetails={
			id:req.params.projectid,
		}
		req.projectdetails=projectdetails;
		console.log(req.projectdetails);
		callback();
		}
	else{
		res.send('you are not admin');
	}
	
}
//api which gets called for giving permission to project
router.post('/givegrant/:projectid',auth.auth,checkadmin,function(req,res){
	

	givegrant(req.projectdetails,function(err,result){
			if(!err)
			{	console.log(result);
					dyna.createtable(result._id,function(err,result){
						if(!err)
						{
							res.send({'result':'permission granted and hub created'});		
						}
						else{
							res.send({'err':err});
						}
					});	
			}
			else{
				res.send('error creating hub')
			}
		})
	})
//api for getting details of all the projects
router.post('/getallproj',auth.auth,checkadmin,function(req,res){
	projects.projects.find({},function(err,project){
		res.send(project);
	})
})
//api for getting details of all the users
router.post('/getallusers',auth.auth,checkadmin,function(req,res){
	user.User.find({},function(err,user){
		res.send(user);
	})
})
//api for registering new user by admin
router.post('/addnewuser',auth.auth,checkadmin,function(req,res){
	var userdetails=new user.User({
		username:req.body.username,
		password:req.body.password,
		name:req.body.name,
		email:req.body.email
	})
	user.createUser(userdetails,function(err,result){
		if(!err)
		{
			res.send('You added'+result);
		}
		else{
			res.send({'err':err});
		}
	})
})
//api for adding new project by admin
router.post('/addnewproject',auth.auth,checkadmin,function(req,res){
	projects.createproject(new project.projects({
		name:req.body.project,
		owner:req.decode.username})
		,function(err,result){
	var token=jwt.sign({
			name:result.name,
			owner:result.owner,
			hubname:result._id},process.env.SECRET,{});
		result.token=token;
		result.hubname=result._id;
		result.save(function(err,success){
			if(err)
			{
				res.send({'error':err})
			}
			else{
						dyna.createtable(result._id,function(err,data){
						if(!err)
						{
							res.send('Project with hubname '+data+' created.');		
						}
						else{
							res.send({'err':err});
						}
					});
			}
		})
	});

		
})
//api for adding new template by admin
router.post('/addnewtemplate',auth.auth,checkadmin,function(req,res){
	var templaterecord=new template.template({d:req.body.d,t:req.body.t,c:req.body.c});
	template.insert(templaterecord,function(err,result){
		if(err){
			res.send({'err':err});
		}
		else{
			res.send('You added '+result);
		}
	})
})
//api for assigning template to user by admin
router.get('/authoriseTemplate/:templateid/:projectid',auth.auth,checkadmin,function(req,res){
	projects.projects.findById(req.params.projectid,function(err,result){
		if(err)
		{
			res.send({'err':'could not get record'})
		}
		else{
			console.log(result)
			flag=0;
			for(var i in result.template)
			{
				if(result.template[i]==req.params.templateid)
				{
					flag=1;
					break;
				}
			}
			if(flag==0)
			{
			result.template.push(req.params.templateid);
			}
			else{
				res.send({'status':'template already exists.'})
			}
			result.save(function(err,result){
				if(err){
					res.send({'err':'error adding template'});
				}
				else{
					res.send({'status':'template added successfully'})
				}
			})
		}
	})
})
//api for adding new type in template
router.post('/addnewtypeintemplate/:id',auth.auth,checkadmin,function(req,res){
	console.log(req.body);
	template.template.findById(req.params.id,function(err,result){
		// console.log('request '+req.body.updates)
		if(err){
			res.send({'err':err});
		}
		else{
			console.log('result: '+result);
			for(i in req.body.t){
				console.log(i);
				flag=0;
				for(j in result.t){
					
					if(result.t[j]==req.body.t[i])
					{
						flag=1;
					}

					
				}
				if(flag==0){
					result.t.push(req.body.t[i]);
				}
			}
			result.save(function(err,result){
				if(!err)
				{
					res.send({'data':'record updated successfully'})
					}
				else{
					res.send({'err':err});
				}

			})

			}
			
		}
	)
})
//api for adding new category in template
router.post('/addnewcategoryintemplate/:id',auth.auth,checkadmin,function(req,res){
	console.log(req.body);
	template.template.findById(req.params.id,function(err,result){
		// console.log('request '+req.body.updates)
		if(err){
			res.send({'err':err});
		}
		else{
			console.log('result: '+result);
			for(i in req.body.c){
				console.log(i);
				flag=0;
				for(j in result.c){
					
					if(result.c[j]==req.body.c[i])
					{
						flag=1;
					}

					
				}
				if(flag==0){
					result.c.push(req.body.c[i]);
				}
			}
			result.save(function(err,result){
				if(!err)
				{
					res.send({'data':'record updated successfully'})
					}
				else{
					res.send({'err':err});
				}

			})

			}
			
		}
	)
})
//api for updating data in template
router.post('/updatedata/:id',auth.auth,checkadmin,function(req,res){
	template.template.findById(req.params.id,function(err,result){
		if(err){
			res.send({'err':err});
		}
		else{
			result.d=req.body.d;
			result.save(function(err,result){
				if(!err)
				{	
				res.send({'status':'data updated successfully'});
				}
				else{
					res.send({'error':'error updating data'})
				}
			})
		}
	})
})
module.exports=router;