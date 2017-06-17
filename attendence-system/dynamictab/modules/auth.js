var router={};
var jwt=require('jsonwebtoken');
router.auth =function(req,res,next){
	var token=req.body.token || req.headers['token'];
	if(token)
	{
		jwt.verify(token,process.env.SECRET,function(err,decode){
			if(err){
				res.status(500).send("Invalid token");
			}
			else
			{
				//req.decode=decode;
				req.decode=decode;
				next();
			}
		});
	}
	else
	{	

		res.status(500).send('no token');
	}
}
router.checkProjectToken=function(req,res,next){
	var projectToken = req.body.projecttoken || req.headers['projecttoken'];
	console.log(projectToken);
	if(projectToken)
	{
		jwt.verify(projectToken,process.env.SECRET,function(err,decode){
			if(err)
			{
				res.send('invalid project token');
			}
			else
			{
				console.log(decode);
				req.projectdecode=decode
				next();
			}
		})
	}
	else{
		res.send('no project token');
	}
}
module.exports = router;