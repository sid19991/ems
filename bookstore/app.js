const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost/bookstore");
var db=mongoose.connection;
genre=require('./models/genres')
book=require('./models/book')
app.use(express.static(__dirname+'/client'))
//app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});
app.get('/api/books',function(req,res){
	book.getBooks(function(err,result){
		if(err){
			throw err;
		}
		else{
			res.json(result);
			console.log(result);
		}
	})
})
app.get('/api/books/:id',function(req,res){
	book.getBookById(req.params.id,function(err,result){
		if(err){
			throw err;
		}
		else{
			res.json(result);
		
		}
	})
})
app.get('/api/genres',function(req,res){
	genre.getGenres(function(err,genres){
		if(err){
			throw err;
		}
		else{
			res.json(genres);
		}
	})
})
app.put('/api/genres/:id',function(req,res){
	var genretoupdate=req.body;
	genre.updateGenre(req.params.id,genretoupdate,{},function(err,genre){
		if(err){
			throw err;
		}
		else{
			res.json(genre);
		}
	})
})
app.delete('/api/genres/:id',function(req,res){
	
	genre.deleteGenre(req.params.id,function(err,genre){
		if(err){
			throw err;
		}
		else{
			res.json(genre);
		}
	})
})
app.delete('/api/books/:id',function(req,res){
	
	book.deleteBook(req.params.id,function(err,book){
		if(err){
			throw err;
		}
		else{
			res.json(book);
		}
	})
})
app.put('/api/books/:id',function(req,res){
	var booktoupdate=req.body;
	book.updateBook(req.params.id,booktoupdate,{},function(err,book){
		if(err){
			throw err;
		}
		else{
			res.json(book);
		}
	})
})
app.post('/api/genres',function(req,res){
	var genretoadd=req.body;
	genre.Genre(genretoadd,function(err,genre){
		if(err){
			throw err;
		}
		else{
			res.json(genre);
		}
	})
})
app.post('/api/books',function(req,res){
	var booktoadd=req.body;
	book.addBook(booktoadd,function(err,book){
		if(err){
			throw err;
		}
		else{
			res.json(book);
		}
	})
})
app.listen(3000);
console.log('server running');