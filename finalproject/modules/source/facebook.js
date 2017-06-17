const FB = require('fb');
const keys = require('../../models/keys');
const EventSearch = require("facebook-events-by-location-core");
FB.options({version:'v2.9'});
var fbkey={};
var router = {};
router.getKeyandgetPlaces = function(center,distance, callback){
	keys.find('facebook',function(err, key){
	if(err){
		res.send({'error':err})
	}
	else{
		process.env.FBKEY = key.apiKey;
		router.getPlaces(center,distance,callback);	
	}
});

};
router.getPlaces = function(center,distance,callback){
	FB.api('search?type=place&q=*&center='+center+'&distance='+distance+'&fields=checkins,name,description,location,category,owner,payment_options,timezone,cover,picture,were_here_count,founded,start_info,about,hours,likes,emails,website,phone,parking,general_info,category_list', {access_token:process.env.FBKEY},function (response) {
  if(!response || response.error) {
   console.log(!response ? 'error occurred' : response.error);
   return;
  }
  //console.log(response)
 		callback(null,response);
  });
};
router.getKeyandgetPlacesByZip = function(center, callback){
	keys.find('facebook',function(err, key){
	if(err){
		res.send({'error':err})
	}
	else{
		process.env.FBKEY = key.apiKey;
		router.getPlacesByZip(center,callback);	
	}
});

};
router.getPlacesByZip = function(center,callback){
	FB.api('search?type=place&q=*&center='+center+'&fields=checkins,name,description,location,category,owner,payment_options,timezone,cover,picture,were_here_count,founded,start_info,about,hours,likes,emails,website,phone,parking,general_info,category_list', {access_token:process.env.FBKEY},function (response) {
  if(!response || response.error) {
   console.log(!response ? 'error occurred' : response.error);
   return;
  }
  //console.log(response)
 		callback(null,response);
  });
};

router.getKeyandgetEvent = function(center,distance, callback){
	keys.find('facebook',function(err, key){
	if(err){
		res.send({'error':err});
	}
	else{
		process.env.FBKEY = key.apiKey;
		router.getEvents(center,distance,callback);	
	}
});

};
router.getEvents = function(center,distance,callback){
        console.log(center)
	const lat = center.split(',')[0];
	const lng = center.split(',')[1];
    if (!lat || !lng) {
       // res.status(500).json({message: "Please specify the lat and lng parameters!"});
    callback({err:'Please specify the lat and lng parameters!'},null);
    }
    else{
    	var options = {};
    	if(lat){
    		options.lat = lat;
    	}
    	if(lng){
    		options.lng = lng;
    	}
    	if(distance){
    		options.distance = distance;
    	}
   		options.accessToken = process.env.FBKEY;
    	var es = new EventSearch(options);
    	es.search().then(function(events){
    		callback(null,events);
    	}).catch(function(err){
    		callback(err,null);
    	});
    }
} ;
module.exports = router;