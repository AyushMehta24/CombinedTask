const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

const post = (req, res) => {
  res.render("./task10/index");
};

const comment = (req, res) => {
  res.render("./task10/comment");
};

module.exports = {
 comment,post
};
