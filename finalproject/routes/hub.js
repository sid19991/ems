//Retrieving dependecies
const express = require('express');
const router = express.Router();
const data = require('../models/data')
const facebook = require('../modules/source/facebook')
const citydata = require('../models/cityinfo')
//route for getting places in a particular city from facebook and inserting them in database
router.post('/getPlaces/:city',function(req,res){
	data.retrieveAccount(req.params.city,function(err,city){
		if(err){
			res.send({err:'',message:err})
		}
		else{
			facebook.getKeyandgetPlaces(city.center,req.body.distance,function(places){
				for(var i in places.data){
					var dataToBeInserted={
						id:places.data[i].id,
						name:places.data[i].name,
						description:places.data[i].description,
						type:"place",
						address:places.data[i].name+', '+
						places.data[i].location.street+', '+
						places.data[i].location.city+'-'+
						places.data[i].location.zip,
						category:places.data[i].category,
						latitude:places.data[i].location.latitude,
						longitude:places.data[i].location.longitude,
						profilePic:places.data[i].picture.data.url,
						attendence:places.data[i].were_here_count,
						general_info:places.data[i].general_info,
						parking:places.data[i].parking,
						phone:places.data[i].phone,
						cover:places.data[i].cover,
						website:places.data[i].website,
						about:places.data[i].about,
						hours:places.data[i].hours,
						checkins:places.data[i].checkins,
						likes:places.data[i].likes,
						emails:places.data[i].emails,
						category_list:places.data[i].category_list
					}
					citydata.insertInfo(dataToBeInserted,req.params.city,function(err,data){
						if(err){
							res.send({'err':err})
						}
					})
				}
				res.send({'places':places})
			})	
		}
	})
})
var makeObject = function(req,res,callback){
 	data.retrieveAccount(req.params.city,function(err,city){
 		if(err){
 			res.send({'err':err,city:city})
 		}
 		else{
 			facebook.getKeyandgetEvent(city.center,req.body.distance,function(err,events){
 				if(err){
 					res.send({err:err,events:events})
 				}
 				else{
 				req.data=[]	
 					//res.send(events);
 				for(var i in events.events){
 				var dataToBeInserted = {
 					type:"event",
 					name:events.events[i].name,
 					description:events.events[i].description,
 					address:events.events[i].venue.name+', '+
 					events.events[i].venue.location.street+', '+
 					events.events[i].venue.location.city+', '+
 					events.events[i].venue.location.zip,
 					category:events.events[i].category,
 					id:events.events[i].id,
 					latitude:events.events[i].venue.location.latitude,
 					longitude:events.events[i].venue.location.longitude,
 					profilePic:events.events[i].profilePicture,
 					payment:events.events[i].ticketUri,
 					event_owner:{
 						id:events.events[i].owner.id,
 						name:events.events[i].owner.name
 					},
 					event_start:events.events[i].startTime,
 					event_end:events.events[i].endTime
 				}
 				req.data.push(dataToBeInserted);
 				//	console.log(events.events[i].ticketUri);
 				}
 				//res.send(events)
 				callback();
 				}
 			})
 		}
 	})	
}
//route for getting places in a particular city from facebook and inserting them in database
router.post('/getEvents/:city', makeObject, function(req, res) {
	for(var i in req.data){
		citydata.insertInfo(req.data[i],req.params.city)
	}
	res.send(req.data);
});

router.post('/addNewPlace/:city',function(req,res){
	citydata.insertInfo(req.body.place, req.params.city,function(err,result){
		if(err){
			res.send({'errInsert':'err'})
		}
		else{
			res.send({'status':result})
		}
	})
})
router.post('/addNewEvent/:city',function(req,res){
	citydata.insertInfo(req.body.event, req.params.city, function(err,result){
		if(err){
			res.send({'errInsert':err})
		}
		else{
			res.send({'status':result})
		}
	})
})
router.get('/approvePost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city,req.params.id,function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].approved = true
			post[0].save(function(err, data){
				if(err){
					res.send({'errApprove':err})
				}
				else{
					res.send({'status':'Post approved'})
				}
			})
		}
	})
})
router.get('/unapprovePost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city,req.params.id,function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].approved = false
			post[0].save(function(err, data){
				if(err){
					res.send({'errUnapprove':err})
				}
				else{
					res.send({'status':'Post unapproved'})
				}
			})
		}
	})
})
router.get('/blockPost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city, req.params.id, function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].blocked = true
			post[0].save(function(err, data){
				if(err){
					res.send({'errBlock':err})
				}
				else{
					res.send({'status':'Post Blocked'})
				}
			})
		}
	})
})
router.get('/unblockPost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city, req.params.id, function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].blocked = false
			post[0].save(function(err, data){
				if(err){
					res.send({'errUnblock':err})
				}
				else{
					res.send({'status':'Post unblocked'})
				}
			})
		}
	})
})
router.get('/pinPost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city, req.params.id, function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].pinned = true
			post[0].save(function(err, data){
				if(err){
					res.send({'errPin':err})
				}
				else{
					res.send({'status':'Post pinned'})
				}
			})
		}
	})
})
router.get('/unpinPost/:city/:id',function(req,res){
	citydata.retrieveById(req.params.city, req.params.id, function(err,post){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			post[0].pinned = false
			post[0].save(function(err, data){
				if(err){
					res.send({'errunpin':err})
				}
				else{
					res.send({'status':'Post unpinned'})
				}
			})
		}
	})
})
router.get('/getData/:city',function(req,res){
    console.log(req.query.type)
    citydata.getinfo(req.params.city,req.query.type,parseInt(req.query.limit),req.query.sort,req.query.category,req.query.datesort,req.query.search,function(err,data){
        if(err){
            res.send({
                'err':err
            })
        }
        else{
            res.send({
                'data':data
            })
        }
    })
})
module.exports = router;
