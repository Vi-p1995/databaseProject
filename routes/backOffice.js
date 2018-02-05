var express = require('express');
var router= express.Router();
var lib = require('dbvi');
var products=lib.products;
var productsBuyed=lib.shopping;

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

router.put('/products/edit/:id',auth,function(req, res){
  id=parseInt(req.params.id);
  name=req.body.product;
  description=req.body.description;
  amount=parseInt(req.body.amount);
  res.json(lib.edit(id,name,description,amount));
});

router.delete('/products/del/:id',auth,function(req, res){
  id=parseInt(req.params.id);
  res.json(lib.del(id));
});

router.get('/products/buyed',auth,function(req, res){
  if(req.query.user != undefined ){
    res.json(lib.search(req.query.user));
  }else{
    res.json(productsBuyed);
  }
});

router.get('/products',auth,function (req,res,next) {
  res.json(products);
});

module.exports=router;
