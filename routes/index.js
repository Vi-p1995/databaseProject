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

router.get('/buy/:id',auth,function(req, res){ // nel url non hai bisogno dell'user che ti viene da req.query
  // l'user lo prendi da req.query.token
  id=parseInt(req.params.id);
  buyer=req.params.user; // diventa req.query token
  lib.buy(id,buyer);
  res.status(201).json(messageBuy);
});

module.exports=router;
