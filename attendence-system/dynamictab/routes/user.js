var express = require('express');
var router = express.Router();
var auth=require('../modules/auth');

var user=require('../models/hub')
var hubop=require('../modules/hubop');

var project=require('../models/project');
/* GET users listing. */
/*router.post('/createhub', auth.auth,hubop.permcheck,function(req, res) {
				dyna.createtable(req.decode.uid,function(err,result){
  		if(!err){
  				
  					res.send('created');
  			
  		}
					
			});  
});*/
router.post('/hubinsert',auth.auth,hubop.permcheck,function(req,res){
	dyna.insert(req.decode.uid,{d:req.body.d,t:req.body.t,c:req.body.t},function(err,result){
		if(!err)
		{
			res.send(result);
		}
		else{
			res.send('an error occured');
		}
	});
});
router.post('/hubretrieve',auth.auth,hubop.permcheck,function(req,res){
	dyna.retrieve(req.decode.uid,function(err,result){
		if(!err)
		{
			res.send(result);
		}
		else{
			res.send('an error occured');
		}
	});
});
router.post('/hubByDate',auth.auth,hubop.permcheck,function(req,res){
	var d=req.body.date.split('/');
	var t=req.body.time.split(':');
	var attr=req.body.attr;
	var date=new Date(d[2],d[1],d[0],t[0],t[1],t[2],0);
	console.log(date);
	dyna.retriveByDate(req.decode.uid,date.toISOString(),attr,function(err,result){
		if(!err){
			res.send(result);
		}
		else{
			res.send('an error occured')
		}
	});
})
router.post('/requestproject',auth.auth,function(req,res){
	project.createproject(new project.projects({name:req.body.project,owner:req.decode.username}),res.send('project permission not granted'));
});
router.get('/getmyproject',auth.auth,function(req,res){
	project.projects.find({owner:req.decode.username}).populate('template').exec(function(err,result){
		if(err){
			res.send({'error':err})
		}
		else
		{
			res.send(result);
		}
	})
})
router.get('/moveDataToGlobal/:id',auth.auth,auth.checkProjectToken,function(req,res){
	user.findById(req.projectdecode.hubname,req.params.id,function(err,data){
		if(err){
			res.send({'error in find':err})
		}
		else
		{	console.log(data);
			user.insert(req.decode.uid,{d:data.d,t:data.t,c:data.c},function(err,result){
				if(err)
				{
					res.send({'error in insert':err})
				}
				else
				{
				user.delete(req.projectdecode.hubname,req.params.id,function(err,result){
					if(err){
						res.send({'error in delete':err})
					}
					else
					{
						res.send({'result':'global object '+result+' created'})
					}
				});
				
				}
			})
		}
	})
})
router.get('/copyDataToGlobal/:id',auth.auth,auth.checkProjectToken,function(req,res){
	user.findById(req.projectdecode.hubname,req.params.id,function(err,data){
		if(err){
			res.send({'error in find':err})
		}
		else
		{	console.log(data);
			user.insert(req.decode.uid,{d:data.d,t:data.t,c:data.c},function(err,result){
				if(err)
				{
					res.send({'error in insert':err})
				}
				else
				{
				res.send({'result':'global object '+result+' created'});
				
				}
			})
		}
	})
})
router.get('/copyDataTolocal/:id',auth.auth,auth.checkProjectToken,function(req,res){
	user.findById(req.decode.uid,req.params.id,function(err,data){
		if(err){
			res.send({'error in find':err})
		}
		else
		{	console.log(data);
			user.insert(req.projectdecode.hubname,{d:data.d,t:data.t,c:data.c},function(err,result){
				if(err)
				{
					res.send({'error in insert':err})
				}
				else
				{
				res.send({'result':'local object '+result+' created'});
				
				}
			})
		}
	})
})
router.get('/moveDataTolocal/:id',auth.auth,auth.checkProjectToken,function(req,res){
	user.findById(req.decode.uid,req.params.id,function(err,data){
		if(err){
			res.send({'error in find':err})
		}
		else
		{	console.log(data);
			user.insert(req.projectdecode.hubname,{d:data.d,t:data.t,c:data.c},function(err,result){
				if(err)
				{
					res.send({'error in insert':err})
				}
				else
				{
				user.delete(req.decode.uid,req.params.id,function(err,result){
					if(err){
						res.send({'error in delete':err})
					}
					else
					{
						res.send({'result':'local object '+result+' created'})
					}
				});
				
				}
			})
		}
	})
})
module.exports = router;
