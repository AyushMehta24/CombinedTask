const con = require("../db");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const session = require("express-session");


let totalPages;
let current = 1;
let limit = 20;
let boom;
let type = "asc";

app.use(
    session({
      name: "query",
      secret: "keyboard cat",
    })
  );

const home = (req, res) => {
  res.render("./searchingData/insert");
};

const insert = (req, res) => {
  res.render("./searchingData/insert");
};

const display = (req, res) => {
  current = 1;
  const tmp = req.body.inp.toLowerCase();
  req.query = tmp;
  const queryParts = tmp.split(/\s+/);

  const orderIndex = queryParts.findIndex(
    (part) => part.toUpperCase() === "ORDER"
  );
  boom = queryParts[orderIndex + 2];
  type = queryParts[orderIndex + 3];

  if (tmp.includes("limit")) {
    const offset = (current - 1) * limit;
    const limitIndex = queryParts.findIndex(
      (part) => part.toUpperCase() === "LIMIT"
    );
    totalPages = Math.ceil(queryParts[limitIndex + 1] / limit);
    queryParts[limitIndex + 1] = offset;
    queryParts[limitIndex + 2] = ",";
    queryParts[limitIndex + 3] = limit;
   let  sql = queryParts.join(" ");
    con.query(sql, function (err, result, fields) {
      if (err) return res.render("../views/error.ejs");
      res.render("./searchingData/display", {
        result: result,
        fields: fields,
        current: current,
        totalPages: totalPages,
        sql: sql,
        boom: boom,
        type: type,
      });
    });
  } else {
    current = 1;

    const fsql = tmp;

    const offset = current * 20 - 20;
    const queryParts = tmp.split(/\s+/);
    queryParts.push("limit");
    queryParts.push(offset);
    queryParts.push(",");
    queryParts.push(limit);

    const sql = queryParts.join(" ");

    con.query(sql, function (err, result, fields) {
      if (err) return res.render("../views/error.ejs");
      con.query(fsql, function (err, result1, fields1) {
        totalPages = result1.length / limit;
        res.render("./searchingData/display", {
          result: result,
          fields: fields,
          current: current,
          totalPages: totalPages,
          sql: fsql,
          boom: boom,
          type: type,
        });
      });
    });
  }
};

const display2 = (req, res) => {
  const tmp = req.body;
  const pagequery = tmp.query;
  if (pagequery.includes("limit")) {
    const page = parseInt(req.params.page);
    current = page;
    const offset = current * 20 - 20;
    const queryParts = tmp.query.split(/\s+/);
    const limitIndex = queryParts.findIndex(
      (part) => part.toUpperCase() === "LIMIT"
    );
    queryParts[limitIndex + 1] = offset;
    const totalPages = parseInt(tmp.tp);
    const sql = queryParts.join(" ");
    con.query(sql, function (err, result, fields) {
      if (err) return res.render("../views/error.ejs");
      res.render("./searchingData/display", {
        result: result,
        fields: fields,
        current: current,
        totalPages: totalPages,
        sql: pagequery,
        boom: boom,
        type: type,
      });
    });
  } else {
    // select * from extname;
    const page = parseInt(req.params.page);
    current = page;
    const offset = current * 20 - 20;
    const queryParts = pagequery.split(/\s+/);
    queryParts.push("limit");
    queryParts.push(offset);
    queryParts.push(",");
    queryParts.push(limit);

    const sql = queryParts.join(" ");

    con.query(sql, function (err, result, fields) {
      if (err) return res.render("../views/error.ejs");
      res.render("./searchingData/display", {
        result: result,
        fields: fields,
        current: current,
        totalPages: totalPages,
        sql: pagequery,
        boom: boom,
        type: type,
      });
    });
  }
};

module.exports = {
  display,
  insert,
  display2,
  home,
};
