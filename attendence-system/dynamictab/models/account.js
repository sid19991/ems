var router={};
var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
	username:{
		type:String
	},
	password:{
		type:String
	},
	name:{
		type:String
	},
	email:{
		type:String
	},
	hash:{
		type:String
	},
	token:[
		{
			token:String,
			pid:mongoose.Schema.Types.ObjectId
		}
	]
});
router.User=mongoose.model('userinfo',userSchema);
router.createUser=function(newUser,callback){
	newUser.save(callback);
}
module.exports=router;