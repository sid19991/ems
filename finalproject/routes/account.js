const router = require('express').Router()
const account = require('../models/account')
router.post('/',function(req,res){
	const insert = new account.account({
		username:req.body.username,
		password:req.body.password,
                center:req.body.center,
                radius:req.body.radius,
                area:req.body.area
	})
	account.account.find({username:req.body.username},function(err,data){
		if(err){
			res.send({'errValidate':err})
		}
		else{
			if(data.length != 0)
				res.send({'errInsert':'Username already exists'})
			else{
				account.account.find({password:req.body.password},function(err,data){
					if(err){
						res.send({'errValidateP':err})
					}
					else{
						if(data.length != 0){
							res.send({'errInsert':'Password already exists'})
						}
						else{
							insert.save(function(err,data){
								if(err){
									res.send({'err':err})
								}
								else{
									res.send({'status':data})
								}
							})
						}
					}
				})
			}
		}
	})

	//res.send('hello')
})
router.post('/updateAccount/username/:id',function(req,res){
	account.account.findOne({username:req.body.username},function(err,data){
		if(err){
			res.send({'errValidate':err})
		}
		else{
			if(data){
				if(data._id != req.params.id){
					res.send({'err':'Username already exists'})
				}
				else{
					account.account.findById(req.params.id, function(err,data){
						if(err){
							res.send({'errRetrieve':err})
						}
						else	{
							data.username = req.body.username
							data.save(function(err,data){
								if(err){
									res.send({'errUpdate':err})
								}
								else{
									res.send({'status':'Username updated successfully'})
								}
							})
						}
					})
				}
			}
			else{
				account.account.findById(req.params.id, function(err,data){
					if(err){
						res.send({'errRetrieve':err})
					}
					else{
						data.username = req.body.username
						data.save(function(err,data){
							if(err){
								res.send({'errUpdate':err})
							}
							else{
								res.send({'status':'Username updated successfully'})
							}
						})
					}
				})
			}
		}
	})
})
router.post('/updateAccount/password/:id',function(req,res){
	account.account.findOne({password:req.body.password},function(err,data){
		if(err){
			res.send({'errValidate':err})
		}
		else{
			if(data){
				if(data._id != req.params.id){
					res.send({'err':'Password already exists'})
				}
				else{
					account.account.findById(req.params.id, function(err,data){
						if(err){
							res.send({'errRetrieve':err})
						}
						else	{
							data.password = req.body.password
							data.save(function(err,data){
								if(err){
									res.send({'errUpdate':err})
								}
								else{
									res.send({'status':'Password updated successfully'})
								}
							})
						}
					})
				}
			}
			else{
				account.account.findById(req.params.id, function(err,data){
					if(err){
						res.send({'errRetrieve':err})
					}
					else{
						data.password = req.body.password
						data.save(function(err,data){
								if(err){
									res.send({'errUpdate':err})
								}
								else{
									res.send({'status':'Password updated successfully'})
								}
							})
					}
				})
			}
		}
	})
})
module.exports = router