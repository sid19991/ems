var router={};
var mongoose=require('mongoose');
var templateSchema=mongoose.Schema({
	d:{
		type:[mongoose.Schema.Types.Mixed]
	},
	time:{
		type:Date,
		default:Date.now()
	},
	t:[String],
	c:[String]
	
	
});
router.template=mongoose.model('template',templateSchema);
router.insert=function(info,callback){

	info.save(callback);
}
router.retrieve=function(callback){
	this.template.find({},callback);
}
router.retriveByDate=function(date,attr,callback){
	if(attr=="after"){
		
		this.template.find({"time":{$gt:date}},callback);
	}
	else if(attr=="before"){
		this.template.find({"time":{$lt:date}},callback);
	}
	else{
		res.send('invalid parameter');
	}
}
module.exports=router;