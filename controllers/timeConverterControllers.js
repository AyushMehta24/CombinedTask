const con = require("../db");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const display = (req,res)=>
{
    res.render("./timeConverter/index2")
}


module.exports = {
    display,
   
  };
  