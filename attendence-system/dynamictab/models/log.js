var router={}
var mongoose=require('mongoose');
var logSchema=mongoose.Schema({
	ip:String,
	api:String,
	headers:mongoose.Schema.Types.Mixed
})
router.log=mongoose.model('log',logSchema);
module.exports=router;
