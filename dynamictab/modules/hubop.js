var user=require('../models/account');
var projects=require('../models/project');
var router={};
router.permcheck=function(req,res,next){
	user.User.findOne({_id:req.decode.uid},function(err,result){
		if(!err)
		{
			if(result.hash!=req.decode.uid)
			{	
				projects.findOne({owner:req.decode.username},function(err,project){
					if(!err)
					{
						if(project.hubname!=req.decode.uif)
						{
							res.send("You don't have the permission of creating and operation on hub.");
						}
							else
							{
							next();
							}
					}
				
				})
				
			}

		}
	})
}
module.exports=router;