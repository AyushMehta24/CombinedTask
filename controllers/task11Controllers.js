const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const display = (req, res) => {
  const sql = `select state from task11_state ; select * from task11_city`;
  con.query(sql, function (err, result) {
    if (err) return res.render("../views/error.ejs");
    let temp = [];
    for (let i = 0; i < result[0].length; i++) {
      temp.push(result[0][i].state);
    }

    res.render("./task11/inedx", { temp });
  });
};

const city = (req, res) => {
  let val = req.params.val;
  const sql = `select state from task11_state ; select * from task11_city`;
  con.query(sql, function (err, result) {
    if (err) return res.render("../views/error.ejs");

    let temp = [];
    for (let i = 0; i < result[0].length; i++) {
      temp.push(result[0][i].state);
    }

    const stateid = temp.indexOf(val) + 1;

    let temp2 = [];
    for (let i = 0; i < result[1].length; i++) {
      if (result[1][i].cid == stateid) {
        temp2.push(result[1][i].city);
      }
    }

    res.send(temp2);
  });
};

module.exports = {
  display,
  city,
};
