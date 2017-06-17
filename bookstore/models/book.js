var mongoose=require('mongoose')
var router={};
var bookSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	genre:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	publisher:{
		type:String,	
	},
	pages:{
		type:String,	
	},
	image_url:{
		type:String,	
	},
	buy_url:{
		type:String,	
	},
	create_date:{
		type:Date,
		default:Date.now()
	}
});
router.Book=mongoose.model('book',bookSchema);
router.getBooks=function(callback,limit){
	this.Book.find(callback);
}
router.getBookById=function(id,callback){
	this.Book.findById(id,callback);
}
router.addBook=function(book,callback){
	this.Book.create(book,callback);
}
router.updateBook=function(id,book,options,callback){
	var query={_id:id};
	var updates={
		name:book.name,
		genre:book.genre,
		description:book.description,
		author:book.author,
		pages:book.pages,
		publisher:book.publisher,
		image_url:book.image_url,
		buy_url:book.buy_url
	}
	this.Book.findOneAndUpdate(query,updates,options,callback);
}
router.deleteBook=function(id,callback){
	var query={_id:id};
	this.Book.remove(query,callback);
}
module.exports=router;