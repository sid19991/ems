const express = require('express');
const router = express.Router();
const manager = require('../modules/mainManager'); 
const data = require('../models/data');
const cityinfo = require('../models/cityinfo')
const google = require('../modules/source/google');
const facebook = require('../modules/source/facebook')
router.get('/insertCity/:city', google.getCenter, function(req, res) {
  data.insertAccount(req.params.city,req.center,function(err,account){
  	if(err){
  		res.send({'error inserting city':err});
  	}
  	else{
  		res.send({'New city inserted':account});
  	}
  })
  });
 

router.get('/xyz', function(req,res){
    manager.init(function(err,result){
        if(err){
            res.send({'error':err});
            }
        else{
            res.send({'status':result});
       }
    }); 
});
router.get('/get/:hubname/:id',function(req,res){
    cityinfo.retrieveById(req.params.hubname,req.params.id,function(err,data){
        if(err){
        res.send({'err':err})
    }
    else{
        res.send({'data':data})
    }
    })
})
router.get('/getByZip/:city',google.getCenter,function(req,res){
 facebook.getKeyandgetPlacesByZip(req.center,function(err,response){
   var k=0;
   var places = []
     response.data.forEach(function(item,index,arr){
       if(item.location.zip == req.body.city){
           {
               places.push(item)
               k++
             }
           
       }
   })
   if(k!=0)
       res.send(places)
 })
})
module.exports = router;
