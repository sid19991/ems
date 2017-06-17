const mongoose = require('mongoose')
const keySchema = mongoose.Schema({
	apiKey:{
		type:String
	},
	apiName:{
		type:String
	},
	clientSecret:{
		type:String
	},
	clientId:{
		type:String
	},
	description:{
		type:String
	}
})
var router={}
router.key = mongoose.model('keys',keySchema);
router.find=function(api,callback){
	this.key.findOne({apiName:api},callback)
}
module.exports = router