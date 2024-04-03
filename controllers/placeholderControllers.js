const con = require("../db");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const post = (req, res) => {
  res.render("./placeholder/index");
};

const comment = (req, res) => {
  res.render("./placeholder/comment");
};

module.exports = {
 comment,post
};
