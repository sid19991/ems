const googlemaps = require('googlemaps');
const keys = require('../../models/keys')
var googlekey={}
var publicConfig={}
var gmapapi={}
keys.find('googlemaps',function(err, key){
	if(err){
		res.send({'error retriving key':err})
	}
	else{
		googlekey = key
		publicConfig = {
    	key:googlekey.apiKey,
    	secure:true
		}
		
	}
})
 	
var router = {}
router.getCenter = function(req,res,callback){
	var geocodeParams={
        "address":req.params.city,
        "language":"en"
    }
    gmapapi = new googlemaps(publicConfig);
  gmapapi.geocode(geocodeParams,function(err,result){
        if(err){
            res.send({'error getting center':err})
        }
        else{
            console.log(result.results[0].geometry.location)
            req.center=result.results[0].geometry.location.lat+','+result.results[0].geometry.location.lng
            callback();
        }
    })
}
module.exports = router