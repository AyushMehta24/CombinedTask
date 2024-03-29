const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

const display = (req,res)=>
{
    res.render("./task14/index2")
}


module.exports = {
    display,
   
  };
  