//account read and hub manage
const async = require('async');
const abc = require('./Plugins/asyncseries')
const autoProcess = require('./autoProcess');
const account = require('../models/account');
var mainManager = {};
mainManager.init = function (cb) {
    account.account.find({}, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            var insertedData = {area: []}
            data.forEach(function (item, index, arr) {
                console.log('item' + item.center)
                var c = new autoProcess(item.center, item.radius, item.username);
                var e = new abc()
                e.addNew(c.getEvents.bind(c))
                e.addNew(c.filterEvents.bind(c))
                e.addNew(c.removeDuplicateEvents.bind(c))
                e.addNew(c.storeEvent.bind(c))
                e.addNew(c.updateDuplicateEvents.bind(c))
                e.execAll(c, function (err, result) {
                    if (err) {
                        cb(err, null)
                    } else {
                        insertedData.events = result
                      
                    }
                })
                var f = new abc()
                f.addNew(c.getPlaces.bind(c))
                f.addNew(c.filterPlaces.bind(c))
                f.addNew(c.removeDuplicatePlaces.bind(c))
                f.addNew(c.storePlace.bind(c))
                f.addNew(c.updateDuplicatePlaces.bind(c))
               f.execAll(c, function (err, result) {
                    if (err) {
                        cb(err, null)
                    } else {
                        insertedData.places = result
                             
                    }
                })
                item.area.forEach(function (item1, index, arr) {
                    //var mainCenter = item1.center.lat+','+item1.center.lng
                    console.log({'item': item1, 'location': item1.location, 'center': item1.center.lat + ',' + item1.center.lng})
                    var areaCenter = item1.center.lat + ',' + item1.center.lng
                    var c1 = new autoProcess(areaCenter, item1.radius, item.username);
                    var e2 = new abc()
                    e2.addNew(c1.getEvents.bind(c1))
                    e2.addNew(c1.filterEvents.bind(c1))
                    e2.addNew(c1.removeDuplicateEvents.bind(c1))
                    e2.addNew(c1.storeandupdateEventInaccount.bind(c1))
                    e2.addNew(c1.updateDuplicateEvents.bind(c1))
                    var f2 = new abc()
                    f2.addNew(c1.getPlaces.bind(c1))
                    f2.addNew(c1.filterPlaces.bind(c1))
                    f2.addNew(c1.removeDuplicatePlaces.bind(c1))
                    f2.addNew(c1.storeandupdatePlaceInaccount.bind(c1))
                    f2.addNew(c1.updateDuplicatePlaces.bind(c))
                    e2.execAll(c1, function (err, result) {
                        if (err) {
                            cb(err, null)
                        } else {
                            insertedData.area.push({'events': result})
                            result.forEach(function(item2,index,arr){
                                console.log('inserting item',item2._id)
                                item1.location.push({
                                    hubId:item2._id,
                                    lat:item2.latitude,
                                    lng:item2.longitude
                                })
                                item.save()
                            })  
                        }
                    f2.execAll(c1, function (err, result) {
                            if (err) {
                                cb(err, null)
                            } else {
                                insertedData.area.push({'places': result})
                                result.forEach(function(item2,index,arr){
                                    console.log('inserting item place',item2._id)
                                    item1.location.push({
                                        hubId:item._id,
                                        lat:item2.latitude,
                                        lng:item2.longitude
                                    })
                                    item.save()
                                })
                            }
                       })
                    })
                });

            })
            cb(null,{'success':'working'});
        }
    });
}
module.exports = mainManager;

var startProcess = function () {
    this.event = [];
    this.place = [];
};

