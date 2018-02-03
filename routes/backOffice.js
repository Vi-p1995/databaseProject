var express = require('express');
var router= express.Router();
var lib = require('dbvi');

var auth = function(req,res,next){
  if(req.query.token==="admin"){
    next();
  }else{
    res.status(401).json({
      message:"errore di autenticazione"
    });
  }
};

router.post('/products/add',auth,function(req, res){
  product=req.body.product;
  description=req.body.description;
  amount=parseInt(req.body.amount);
  lib.add(product,description,amount);
  res.json({message:"product added"});
});

router.post('/products/edit/:id',auth,function(req, res){
  id=parseInt(req.params.id);
  name=req.body.product;
  description=req.body.description;
  amount=parseInt(req.body.amount);
  lib.edit(id,name,description,amount);
  res.json(messageEdit);
});

router.get('/products/del/:id',auth,function(req, res){
  id=parseInt(req.params.id);
  lib.del(id);
  res.json(messageDelete);
});

router.get('/products/buyed',auth,function(req, res){
  if(req.query.user != undefined ){
    lib.search(req.query.user);
    res.json(arraySearch);
  }else{
    res.json(shopping);
  }
});

router.get('/products',auth,function (req,res,next) {
  res.json(products);
});

module.exports=router;
