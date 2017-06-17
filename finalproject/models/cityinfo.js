const mongoose = require('mongoose')
const citySchema = mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    category: {
        type: String
    },
    id: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    general_info: String,
    profilePic: {
        type: String
    },
    payment: {
        type: String
    },
    phone: {
        type: String
    },
    likes: {
        data: [{name: String, id: String}]
    },
    checkins: {
        type: Number
    },
    category_list: [{
            id: String,
            name: String
        }],
    website: String,
    parking: {
        lot: Number,
        valet: Number,
        street: Number
    },
    hours: {
        mon_1_open: String,
        mon_1_close: String,
        tue_1_open: String,
        tue_1_close: String,
        wed_1_open: String,
        wed_1_close: String,
        thu_1_open: String,
        thu_1_close: String,
        fri_1_open: String,
        fri_1_close: String,
        sat_1_open: String,
        sat_1_close: String,
        sun_1_open: String,
        sun_1_close: String
    },
    likes: [{
            name: String,
            id: String
        }],
    emails: [String],
    event_owner: {
        id: String,
        name: String
    },
    event_start: {
        type: String
    },
    event_end: {
        type: String
    },
    attendence: {
        type: String
    },
    cover: {
        offset_x: Number,
        offset_y: Number,
        cover_id: String,
        id: String,
        source: String
    },
    about: String,
    approved: {
        type:Boolean,
        default:false
    },
    blocked: {
        type:Boolean,
        default:false
    },
    pinned: {
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
var router = {}
router.insertInfo = function (info, cityname, callback) {
    var city = mongoose.model(cityname, citySchema)
    var data = new city(info)
    data.save(callback)
}
router.retrievePlaces = function (city, callback) {
    var city = mongoose.model(city, citySchema)
    city.find({type: "place"}, callback)
}
router.retriveinfoByName = function (name, city, callback) {
    var city = mongoose.model(city, citySchema)
    city.find({name: name}, callback)
}
router.retriveEvents = function (city, callback) {
    var city = mongoose.model(city, citySchema)
    city.find({type: "event"}, callback)
}
router.retrieveById = function (city, id, callback) {
    var city = mongoose.model(city, citySchema)
    city.find({id: id}, callback)
}
router.getinfo = function (city, type, limit, sort,category,dateSort,search,callback) {
    var city = mongoose.model(city, citySchema)
    var query = {};
    if (type) {
        query.type = type;
    }
    if(search){
        query.$or = [
            {name:search},
            {description:search}
        ] 
    }
    var execute = city.find(query)
    if(limit){
        execute.limit(limit)
    }
    if(sort){
        if(sort == "start_time"){
                if(type == "event"){
                    execute.sort({sort:1})
                }
        }
        else{
            execute.sort({sort:1})
        }
    }
    if(category){
        execute.where('category').equals(category)
    }
    if(dateSort){
        if(type == "event")
        execute.sort({event_start:1})
    }
    execute.exec(callback)
}
module.exports = router