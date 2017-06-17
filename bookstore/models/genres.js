var mongoose=require('mongoose')
var router={};
var genreSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	create_date:{
		type:Date,
		default:Date.now()
	}
});
router.Genre=mongoose.model('Genre',genreSchema);
router.getGenres=function(callback,limit){
	this.Genre.find(callback);
}
router.addGenre=function(genre,callback){
	this.Genre.create(genre,callback);
}
router.updateGenre=function(id,genre,options,callback){
	var query={_id:id};
	var updates={
		name:genre.name
	}
	this.Genre.findOneAndUpdate(query,updates,options,callback);
}
router.deleteGenre=function(id,callback){
	var query={_id:id};
	this.Genre.remove(query,callback);
}
module.exports=router;