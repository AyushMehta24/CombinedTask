const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

var nrp = 10,
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
    `SELECT * FROM task5_studentmaster limit ${current * 10 - 10} , 10`,
    function (err, result, fields) {
      try {
        if (err) throw err;
        res.render("./task5/display", {
          nrp: nrp,
          current: current,
          data: result,
          feild: false,
        });
      } catch (err) {
        console.log(err);
        res.render("../views/error.ejs");
      }
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
      current * 10 - 10
    } , 10`,
    function (err, result, fields) {
      try {
        if (err) throw err;
        res.render("./task5/order", {
          nrp: nrp,
          current: current,
          data: result,
          feild: feild,
          type: type,
        });
      } catch (err) {
        console.log(err);
        res.render("../views/error.ejs");
      }
    }
  );
};

module.exports = {
  display,
  order,
  component,
  home,
};
