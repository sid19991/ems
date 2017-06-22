var app = require('express')()
var bodyParser = require('body-parser')
var nodeGeocoder = require('node-geocoder')
var http = require('http');
var options = {
	provider:'opencage',
	httpAdapter:'https',
	apiKey:'654ce15ac536490facd1939fdf6176a8',
	formatter:null
}
var request = require('request')
var geocoder = nodeGeocoder(options)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.post('/',function(req,res){
http.get('http://api.opencagedata.com/geocode/v1/json?q='+req.body.lat+','+req.body.lng+'&pretty=1&no_annotations=1&key=654ce15ac536490facd1939fdf6176a8',function(response){
	console.log(response.statusCode)
	if(response.statusCode == 200){
		var parsed = JSON.parse(response)
		res.send(parsed)
	}
	else{
		res.json(response)
		}
	})
})
app.listen(3000)