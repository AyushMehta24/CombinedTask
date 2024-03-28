const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const display = (req, res) => {
  const sql = `select state from task11_state ; select * from task11_city`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    let ayush = [];
    for (let i = 0; i < result[0].length; i++) {
      ayush.push(result[0][i].state);
    }

    res.render("./task11/inedx", { ayush });
  });
};

const city = (req, res) => {
  let val = req.params.val;
  console.log(val);
  const sql = `select state from task11_state ; select * from task11_city`;
  con.query(sql, function (err, result) {
    if (err) throw err;

    let ayush = [];
    for (let i = 0; i < result[0].length; i++) {
      ayush.push(result[0][i].state);
    }

    const stateid = ayush.indexOf(val) + 1;
    console.log(stateid);

    let ayush2 = [];
    for (let i = 0; i < result[1].length; i++) {
      if (result[1][i].cid == stateid) {
        ayush2.push(result[1][i].city);
      }
    }

    res.send(ayush2);
  });
};

module.exports = {
  display,
  city,
};
