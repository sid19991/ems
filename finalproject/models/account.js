const mongoose = require('mongoose');
const accountSchema = mongoose.Schema({
	username:String,
	password:String,
        center:String,
        radius:Number,
	area:[{
		name:String,
		radius:Number,
		center:{
                    lat:Number,
                    lng:Number
                },
                location:[{
			lat:Number,
			lng:Number,
			hubId:String
		}]
	}]
});
var router = {};
router.account = mongoose.model('accounts1',accountSchema);
module.exports = router;
