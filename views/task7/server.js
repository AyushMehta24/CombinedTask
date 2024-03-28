const mysql = require("mysql");
const express = require("express");
const app = express();
const session = require("express-session");

var ayush;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "27feb_attendence",
});

con.connect(function (err) {
  console.log("connected");
});

app.use(
  session({
    name: "query",
    secret: "keyboard cat",
  })
);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/insert", (req, res) => {
  res.render("insert");
});

var totalPages;
var current = 1;
var limit = 20;
var boom;
var type = "asc";

app.post("/display", (req, res) => {
  current = 1;
  const tmp = req.body.inp.toLowerCase();
  req.session.query = tmp;
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
    ayush = queryParts.join(" ");
    con.query(ayush, function (err, result, fields) {
      if (err) throw err;
      res.render("display", {
        result: result,
        fields: fields,
        current: current,
        totalPages: totalPages,
        sql: ayush,
        boom: boom,
        type: type,
      });
    });
  } else {
    current = 1;

    const vansh = tmp;

    const offset = current * 20 - 20;
    const queryParts = tmp.split(/\s+/);
    queryParts.push("limit");
    queryParts.push(offset);
    queryParts.push(",");
    queryParts.push(limit);

    const ayush1 = queryParts.join(" ");

    con.query(ayush1, function (err, result, fields) {
      if (err) throw err;
      con.query(vansh, function (err, result1, fields1) {
        totalPages = result1.length / limit;
        res.render("display", {
          result: result,
          fields: fields,
          current: current,
          totalPages: totalPages,
          sql: vansh,
          boom: boom,
          type: type,
        });
      });
    });
  }

  
});

app.post("/display/:page/:boom/:type", (req, res) => {
  console.log(req.session.query);
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
    const ayush1 = queryParts.join(" ");
    con.query(ayush1, function (err, result, fields) {
      if (err) throw err;
      res.render("display", {
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

    const ayush1 = queryParts.join(" ");

    con.query(ayush1, function (err, result, fields) {
      if (err) throw err;
      res.render("display", {
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
});

app.listen(8000);
console.log("Server is listening on port 8000");


