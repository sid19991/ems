var myApp=angular.module('myApp')
myApp.controller('BooksController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	console.log('In bookscontroller');
	
	$scope.getBooks=function(){
		console.log('in get books')
		$http.get('/api/books').then(function(response){
		console.log(response);
		$scope.books=response.data;

		})
	}
		$scope.getBook=function(){
		var id=$routeParams.id;
		$http.get('/api/books/'+id).then(function(response){
		console.log(response);
		$scope.book=response.data;

		})
	}
	$scope.addBook=function(){
		$http.post('/api/books',$scope.book).then(function(response){
			window.location.href='#/books'
		})
	}
	$scope.updateBook=function(){
		var id=$routeParams.id;
		$http.put('/api/books/'+id,$scope.book).then(function(response){
		window.location.href='#/books'

		})
	}
	
	$scope.removeBook=function(id){
		$http.delete('/api/books/'+id).then(function(response){
		window.location.href='#/books'

		})
	}

}])