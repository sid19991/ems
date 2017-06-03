var router={};
var mongoose=require('mongoose');
tableSchema=mongoose.Schema({
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
router.createtable=function(name,callback)
{		
		console.log(name);
		var tab=mongoose.model(name.toString(),tableSchema);
		var newtabl = new tab({d:name,t:"your hub created",c:"you can operate"});
	  	newtabl.save(callback);
};
router.insert=function(name,info,callback){
	var entrytab=mongoose.model(name,tableSchema);
	var record=new entrytab(info);
	record.save(callback);
}
router.findById=function(hubname,id,callback){
	//console.log(updates);
	// console.log('parameters: '+ updates.t+'id:'+id);
	var hub=mongoose.model(hubname,tableSchema);
	hub.findById(id,callback);
}
router.retrieve=function(name,callback){
	var tab=mongoose.model(name,tableSchema);
	tab.find({},callback);
}
router.retriveByDate=function(name,date,attr,callback){
	if(attr=="after"){
		var tab=mongoose.model(name,tableSchema);
		tab.find({"time":{$gt:date}},callback);
	}
	else if(attr=="before"){
		var tab=mongoose.model(name,tableSchema);
		tab.find({"time":{$lt:date}},callback);
	}
	else{
		res.send('invalid parameter');
	}
}
router.delete=function(hubname,id,callback){
	var hub=mongoose.model(hubname,tableSchema);
	hub.findOneAndRemove({_id:id},callback);
}
router.findById=function(hubname,id,callback){
	var hub=mongoose.model(hubname,tableSchema);
	hub.findById(id,callback)
}
module.exports=router;