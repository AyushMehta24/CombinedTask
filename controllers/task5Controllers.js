const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

var nrp = 250,
  current = 1;

const home = function (req, res) {
  res.render("./task5/index");
};

const display = (req, res) => {
  let page = req.query.page;
  if (page == undefined || page == null) {
    page = 1;
  }
  current = page;

  con.query(
    `SELECT * FROM task5_studentmaster limit ${current * 200 - 200} , 200`,
    function (err, result, fields) {
      if (err) throw err;
      res.render("./task5/display", {
        nrp: nrp,
        current: current,
        data: result,
        feild: false,
      });
    }
  );
};

const component = (req, res) => {
  let page = req.query.page;
  if (page == undefined || page == null) {
    page = 1;
  }
  current = page;
  res.render("./task5/component", { nrp: nrp, current: current });
};

const order = (req, res) => {
  let page = req.query.page;
  let feild = req.query.feild;
  let type = req.query.type;

  if (page == undefined || page == null) {
    page = 1;
  }

  if (feild == undefined || feild == null) {
    feild = "sid";
  }

  if (type == undefined || type == null) {
    type = "asc";
  }
  current = page;

  con.query(
    `SELECT * FROM task5_studentmaster order by ${feild} ${type} limit ${
      current * 200 - 200
    } , 200`,
    function (err, result, fields) {
      if (err) throw err;
      res.render("./task5/order", {
        nrp: nrp,
        current: current,
        data: result,
        feild: feild,
        type: type,
      });
    }
  );
};

module.exports = {
  display,
  order,
  component,
  home,
};
