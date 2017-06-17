const account = require('../models/account')
const router = require('express').Router();
router.post('/insertArea', function(req,res){
	account.account.findById(req.body.id,function(err,data){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			data.area.push(req.body.area)
			data.save(function(err,result){
				if(err){
					res.send({'errInsert':err})
				}
				else{
					res.send({'message':result})
				}
			})
		}
	})
})
router.get('/getArea/:id/:accountid',function(req,res){
	account.account.findById(req.params.accountid,function(err,data){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			data.area.forEach(function(item,index,arr){
				if(item._id == req.params.id)
				{
					res.send(item)
				}
			})

		}
	})
})
router.get('/removeArea/:id/:accountid',function(req,res){
	account.account.findById(req.params.accountid,function(err,data){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			for(var i in data.area){
				if(data.area[i]._id == req.params.id){
					data.area.splice(i,1)
				}
			}
			data.save(function(err,data){
				if(err){
					res.send({'errSave':err})
				}
				else{
					res.send({'status':'area removed successfully'})
				}
			})
		}
	})
})
router.post('/updateArea/:id/:accountid',function(req,res){
	account.account.findById(req.params.accountid,function(err,data){
		if(err){
			res.send({'errRetrieve':err})
		}
		else{
			data.area.forEach(function(item,index,arr){
				if(item._id == req.params.id){
					item.name = req.body.area.name
                                        item.radius = req.body.area.radius
                                        item.center = req.body.area.center
				}
			})
                        data.save(function(err,result){
                            if(err){
                                res.send({'err':err})
                            }
                            else{
                            res.send({'message':'area updated successfully'})
                        }
                        })
		}
	})
})
module.exports = router