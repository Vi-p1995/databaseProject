var express = require('express');
var router= express.Router();
var lib = require('dbvi');

var auth = function(req,res,next){
  if(req.query.token==="pippo" || req.query.token==="caio" || req.query.token==="sempronio"){
    next();
  }else{
    res.status(401).json({
      message:"errore di autenticazione"
    });
  }
};

router.get('/buy/:id',auth,function(req, res){
  id=parseInt(req.params.id);
  buyer=req.query.user;
  res.status(201).json(lib.buy(id,buyer));
});

module.exports=router;
