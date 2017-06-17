const mongoose = require('mongoose')
const accountSchema = mongoose.Schema({
	cityname:{
		type:String
	},
	center:{
		type:String
	}
})
var router = {}
router.account = mongoose.model('account', accountSchema)
router.insertAccount = function(name, center, callback){
	var accountEntry = new this.account({
		cityname:name,
		center:center
	})
	accountEntry.save(callback);
}
router.retrieveAccount = function(city,callback){
	this.account.findOne({cityname:city},callback)
}
module.exports=router