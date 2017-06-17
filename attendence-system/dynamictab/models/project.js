var router={};
var mongoose=require('mongoose');
var projectSchema=mongoose.Schema({
	name:{
		type:String
	},
	owner:{
		type:String
	},
	token:{
		type:String
	},
	hubname:{
		type:String
	},
	template:[{type:mongoose.Schema.Types.ObjectId,ref:'template'}],
	livetoken:String,
	user:[{
		user:mongoose.Schema.Types.ObjectId,
		aC:Number
	}
		],
		activated:{type:Boolean,
			default:false}
});
router.projects=mongoose.model('projects',projectSchema);
router.createproject=function(projectdetails,callback){
	projectdetails.save(callback);
}
module.exports=router;