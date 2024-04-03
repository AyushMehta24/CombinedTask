const con = require("../db");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const display = (req, res) => {
  res.render("./comboGenrator/insert");
};

const insert = (req, res) => {
  let comboname = req.body.name;
  if (comboname == "") {
    return res.render("./comboGenrator/insert");
  }
  comboname = comboname.replaceAll('"', "");
  comboname = comboname.trim(" ");
  sql = `SELECT select_name ,combo_type, multi_value , option_key from task9_select_master join task9_option_master   where task9_option_master.sid = task9_select_master.sid and select_name= "${comboname}" ;`;
  con.query(sql, function (err, result, fields) {
    if (err) return res.render("insert");
    else if (!result.length) {
      return res.send("No data Found");
    } else {
      res.render("./comboGenrator/component", {
        result,
      });
    }
  });
};


module.exports = {
    display,
    insert,
  };