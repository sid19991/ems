//Retrieving dependecies
const facebook = require('./source/facebook');
const data = require('../models/data');
const async = require('async');
const citydata = require('../models/cityinfo');
var _ = require('lodash');
var error = {};
function router(center, radius, hubname) {
    this.events = [];
    this.filteredEvents = [];
    this.places = [];
    this.resultPlaces = []
    this.resultEvents = []
    this.newfileteEvents = []
    this.newfiletePlaces = []
    this.center = center;
    console.log(this.center)
    this.radius = radius;
    this.filteredPlaces = [];
    this.hubname = hubname;
    this.error = [];
    this.result = [];
    this.duplicateEvents = []
    this.duplicatePlaces = []
}

router.prototype.getEvents = function (callback) {
    console.log('getevent' + this.center)
    var c = this;
    facebook.getKeyandgetEvent(this.center, this.radius, function (err, events) {
        if (err) {
            c.error.push({getEvents: err})
            c.result.push({getEvents: null})
            callback(err, null);
        } else {
            c.events = events.events;
            
            c.error.push({getEvents: null})
            c.result.push({getEvents: events.events})
            callback(null, events.events);
        }

    });

};
router.prototype.getPlaces = function (callback) {
    var c = this
    console.log('get place s is wokring');
    facebook.getKeyandgetPlaces(c.center, c.radius, function (err, places) {
        if (err) {
            console.log(err)
            c.error.push({getPlaces: err})
            c.result.push({getPlaces: null})
            callback(err, null);
        } else {

            c.places = places.data;
            c.error.push({getPlaces: null})
            c.result.push({getPlaces: places.data});
            callback(null, places.data);
        }
    });
};
router.prototype.filterEvents = function (callback) {
   var t = this;
    this.events.forEach(function (item, index, arr) {
        var dataToBeInserted = {
            type: "event",
            name: item.name,
            description: item.description,
            address: item.venue.name + ', ' +
                    item.venue.location.street + ', ' +
                    item.venue.location.city + ', ' +
                    item.venue.location.zip,
            category: item.category,
            id: item.id,
            latitude: item.venue.location.latitude,
            longitude: item.venue.location.longitude,
            profilePic: item.profilePicture,
            payment: item.ticketUri,
            event_owner: {
                id: item.owner.id,
                name: item.owner.name
            },
            event_start: item.startTime,
            event_end: item.endTime

        };
        t.filteredEvents.push(dataToBeInserted);
    });
    this.error.push({filterEvents: null})
    this.result.push({filterEvents: this.filteredEvents})
       callback(null, this.filteredEvents);
};
router.prototype.filterPlaces = function (callback) {
    var t = this;
    console.log('fileter place is working');
    this.places.forEach(function (item, index, arr) {
        var dataToBeInserted = {
            id: item.id,
            name: item.name,
            description: item.description,
            type: "place",
            address: item.name + ', ' +
                    item.location.street + ', ' +
                    item.location.city + '-' +
                    item.location.zip,
            category: item.category,
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            profilePic: item.picture.data.url,
            attendence: item.were_here_count,
            general_info: item.general_info,
            parking: item.parking,
            phone: item.phone,
            cover: item.cover,
            website: item.website,
            about: item.about,
            hours: item.hours,
            checkins: item.checkins,
            likes: item.likes,
            emails: item.emails,
            category_list: item.category_list
        };
        t.filteredPlaces.push(dataToBeInserted);
    });
   
    this.error.push({filterPlaces: null})
    this.result.push({filterPlaces: this.filteredPlaces})
    callback(null, this.filteredPlaces);
};
router.prototype.storePlace = function (callback) {
    var k=0
    var t = this
    console.log('storePlace called');
    this.filteredPlaces.forEach(function (item, index, arr) {
        citydata.insertInfo(item, t.hubname, function (err, data) {
            if (err) {
                callback(err, null);
            }
                else {
                    k++;
                    if(k >= t.filteredPlaces.length)
                    callback(null, t.filteredPlaces);
                }
        });
    })

};
router.prototype.removeDuplicatePlaces = function (callback) {
    var f = this
    var k = 0;
    console.log('remove duplication places is working');
    var len = f.filteredPlaces.length
    f.filteredPlaces.forEach(function(item,index,arr){
        citydata.retrieveById(f.hubname, item.id, function (err, data) {
            //console.log(data.length)
            if (err) {
                f.error.push({removeDuplicates: err})
                f.result.push({removeDuplicates: null})
                callback(this.error, null)
            } else {
               
                if (data.length != 0) {
                 f.duplicatePlaces.push(item)
                }else{
                    f.newfiletePlaces.push(_.cloneDeep(item));
                }
                k++;
                if (k >= len) {
                    f.filteredPlaces = f.newfiletePlaces;
                    console.log(index,'this is fileteded event after called', f.filteredPlaces.length);
                    callback(null, f.filteredPlaces);

                }
            }
        })
    })
   
}
router.prototype.removeDuplicateEvents = function (callback) {
    var f = this
    var k = 0;
    var len = f.filteredEvents.length;

    f.filteredEvents.forEach(function(item,index,arr){
        citydata.retrieveById(f.hubname, f.filteredEvents[index].id, function (err, data) {
            if (err) {
                f.error.push({removeDuplicates: err})
                f.result.push({removeDuplicates: null})
                callback(this.error, null)
            } else {
                if (data.length != 0) {
                  f.duplicateEvents.push(item)
                }else{
                    f.newfileteEvents.push(_.cloneDeep(item));
                }
                k++;
                if (k >= len) {
                    f.filteredEvents = f.newfileteEvents;
                    console.log(index,'this is fileteded event after called', f.filteredEvents.length);
                    callback(null, f.filteredEvents);

                }

            }
        })
    })

}
router.prototype.storeEvent = function (callback) {
    var k = 0;
    var t = this
    console.log('store event is called', this.filteredEvents.length);
    if(t.filteredEvents.length == 0){
        callback(null,t.filteredEvents)
    }
    this.filteredEvents.forEach(function (item, index, arr) {
        citydata.insertInfo(item, t.hubname, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                k++;
                if (k >= t.filteredEvents.length) {
                    callback(null, t.filteredEvents);
                }
            }
        });
    })
};
router.prototype.storeandupdateEventInaccount = function(callback){
    var k = 0;
    var t = this
    console.log('store and update event is called', this.filteredEvents.length);
    if(t.filteredEvents.length == 0){
        callback(null,t.filteredEvents)
    }
    this.filteredEvents.forEach(function (item, index, arr) {
        citydata.insertInfo(item, t.hubname, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                k++;
                t.resultEvents.push(data)
                if (k >= t.filteredEvents.length) {
                    callback(null, t.resultEvents);
                }
            }
        });
    })
}
router.prototype.storeandupdatePlaceInaccount = function(callback){
    var k = 0;
    var t = this
    console.log('store and update place is called', this.filteredPlaces.length);
    if(t.filteredEvents.length == 0){
        callback(null,t.filteredPlaces)
    }
    this.filteredPlaces.forEach(function (item, index, arr) {
        citydata.insertInfo(item, t.hubname, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                k++;
                t.resultPlaces.push(data)
                if (k >= t.filteredPlaces.length) {
                    callback(null, t.resultPlaces);
                }
            }
        });
    })
}
router.prototype.updateDuplicateEvents = function(callback){
    var t = this
    console.log('upadate Events is working')
    t.duplicateEvents.forEach(function(item,index,arr){
        
        citydata.retrieveById(t.hubname,item.id,function(err,data){
            if(data[0].name !== item.name){
                data[0].name = item.name
                //(console.log('updating name'))
            }
            if(data[0].description != item.description){
                data[0].description = item.description
                //(console.log('updating description'))

            }
            if(data[0].category !== item.category){
                data[0].category = item.category
                //(console.log('updating category'))
                
            }
            if(data[0].address !== item.address){
                data[0].address = item.address
                //(console.log('updating address'))
            }
            if(data[0].latitude != item.latitude){
                data[0].latitude = item.latitude
               // (console.log('updating latitude'))
            }
            if(data[0].longitude !== item.longitude){
                data[0].longitude = item.longitude
             //   (console.log('updating longitude'))
            }
            if(data[0].profilePic !== item.profilePic){
                data[0].profilePic = item.profilePic
           //     (console.log('updating profilePic'))
            }
            if(data[0].payment !== item.payment){
                data[0].payment = item.payment
                //(console.log('updating payment'))
            }
            if(data[0].event_owner !== item.event_owner){
                if(item.event_owner)
                data[0].event_owner = item.event_owner
                else
                    data[0].event_owner = null
                //(console.log('updating event owner'))
            }
            if(data[0].event_start !== item.event_start){
                data[0].event_start = item.event_start
               // (console.log('updating start time'))
            }
            if(data[0].event_end !== item.event_end){
                data[0].event_end = item.event_end
             //   (console.log('updating end time'))
            }
           // console.log('saving data')
            data[0].save()
        })
    })
    callback(null,t.resultEvents)
}
router.prototype.updateDuplicatePlaces = function(callback){
    var t = this
    
    t.duplicatePlaces.forEach(function(item,index,arr){
        if(item.id == "109393315745959")
            console.log(item)
        citydata.retrieveById(t.hubname,item.id,function(err,data){
            
            if(data[0].name !== item.name){
                data[0].name = item.name
            }
            if(data[0].description !== item.description){
                data[0].description = item.description
            }
            if(data[0].category !== item.category){
                data[0].category = item.category
            }
            if(data[0].address !== item.address){
                data[0].address = item.address
            }
            if(data[0].latitude !== item.latitude){
                data[0].latitude = item.latitude
            }
            if(data[0].longitude !== item.longitude){
                data[0].longitude = item.longitude
            }
            if(data[0].profilePic !== item.profilePic){
                data[0].profilePic = item.profilePic
            }
            if(data[0].cover !== item.cover){
                data[0].cover = item.cover
            }
            if(data[0].parking !== item.parking){
                data[0].parking = item.parking
            }
            if(data[0].phone !== item.phone){
                data[0].phone = item.phone
            }
            if(data[0].checkins !== item.checkins){
                data[0].checkins = item.checkins
            }
            if(data[0].likes !== item.likes){
                data[0].likes = item.likes
            }
            if(data[0].hours !== item.hours){
                data[0].hours = item.hours
            }
            if(data[0].about !== item.about){
                data[0].about = item.about
            }
            if(data[0].website !== item.website){
                data[0].website = item.website
            }
            if(data[0].emails !== item.emails){
                data[0].emails = item.emails
            }
            if(data[0].category_list !== item.category_list){
                data[0].category_list = item.category_list
            }
            if(data[0].general_info !== item.general_info){
                data[0].general_info = item.general_info
            }
            data[0].save()
        })
    })
    callback(null,t.resultPlaces)
}
module.exports = router;
