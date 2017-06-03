//add new data and list all the data
//ask hubname
var hub=require('../models/hub');
var multiparty = require('connect-multiparty'),
       multipartyMiddleware = multiparty();
var fs=require('fs');
var jwt=require('jsonwebtoken');
var auth=require('../modules/auth');
var router=require('express').Router();

var project=require('../models/project');
router.post('/addnewdata',auth.auth,auth.checkProjectToken,function(req,res){
	var data={
		d:req.body.d,
		t:req.body.t,
		c:req.body.c
	}

	hub.insert(req.projectdecode.hubname,data,function(err,result){
		if(!err){
			res.send('data inserted:'+result);
		}
		else{
			res.send('error inserting data');
		}
	})
})
router.post('/addDataFromFile',function(req,res){
	console.log(req.files);
	res.send("testing");
	// var stream=fs.createReadStream(req.files.data.path.toString());
	// stream.on('data',function(err,data){
	// 	if(err)
	// 	{
	// 		res.send({'err':err})
	// 	}
	// 	else{
	// 		res.write(data);
	// 	}
	// 	})
	// 	stream.on('end',function(){
	// 		res.end();
	// 	})
		
	})
router.post('/addnewtype/:id',auth.auth,auth.checkProjectToken,function(req,res){
	console.log(req.body);
	hub.findById(req.projectdecode.hubname,req.params.id,function(err,result){
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
router.post('/addnewcategory/:id',auth.auth,auth.checkProjectToken,function(req,res){
	console.log(req.body);
	hub.findById(req.projectdecode.hubname,req.params.id,function(err,result){
		
		if(err){
			res.send({'err':err});
		}
		else{
			console.log('result: '+result);
			for(i in req.body.c){
				console.log(i);
				flag=0;
				for(j in result.c){
					
					if(req.body.c[i]==result.c[j])
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
router.post('/updatedata/:id',auth.auth,auth.checkProjectToken,function(req,res){
	hub.findById(req.projectdecode.hubname,req.params.id,function(err,result){
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
router.get('/getLiveToken',auth.auth,auth.checkProjectToken,function(req,res){
	project.projects.findById(req.projectdecode.hubname,function(err,project){
		if(!project.livetoken)
		{
			var token=jwt.sign({hubname:req.projectdecode.hubname},process.env.SECRET,{});
			project.livetoken=token;
			project.save(function(err,success){
				if(err)
				{
					res.send({'error':err});
				}
				else
				{
					res.send({'token':token});
				}
			})
			
		}
		else
		{
			res.send({'token':project.livetoken});
		}
	})
})
router.get('/getDataWebsite',auth.auth,auth.checkProjectToken,function(req,res){
	var token=req.body.livetoken || req.headers['livetoken']
	if(token){
		jwt.verify(token,process.env.SECRET,function(err,decode){
			if(err)
			{
				res.send({'err':'Invalid token'})
			}
			else
			{
				hub.retrieve(decode.hubname,function(err,hub){
					res.send({'data':hub});
				})
			}
		})
	}
		else{
			res.send({'err':'no token'})
		}
})
module.exports=router;