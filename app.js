var index=require("./routes/index");
var backOffice=require("./routes/backOffice");
var bodyParser = require('body-parser');
var express = require('express');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}));

app.use("/users", index);
app.use("/admin", backOffice);
app.listen(3001);

module.exports=app;
