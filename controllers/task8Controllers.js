const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

const insert = (req, res) => {
  res.render("./task8/insert");
};

const result = (req, res) => {
  var string = req.body.input;

  if (string == "") {
    con.query(
      "select * from task6_studentmaster limit 20",
      function (err, result, fields) {
        if (err) return res.render("../views/error.ejs");
        res.render("./task8/result", {
          result,
          fields,
        });
      }
    );
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  let strArray = string.split("");
  let result = strArray.reduce((chars, ch) => {
    if (!chars[ch]) {
      chars[ch] = 1;
    } else {
      chars[ch] += 1;
    }
    return chars;
  }, []);
 

  var query;

  if (string == "") {
    query = `select * from task6_studentmaster limit 20`;
  }

  const start = `select * from task6_studentmaster where (`;

  var fnames = [];
  var lnames = [];
  var emails = [];
  var collages = [];
  var phones = [];
  var cities = [];

  function getAllIndexes(arr, val) {
    var indexes = [],
      i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }
  string = string.trim();

  for (let i = 0; i < result["_"]; i++) {
    string = string.replace("_", ` fname=`);
  }

  for (let i = 0; i < result["^"]; i++) {
    string = string.replace("^", ` lname=`);
  }

  for (let i = 0; i < result["$"]; i++) {
    string = string.replace("$", ` email=`);
  }

  for (let i = 0; i < result["}"]; i++) {
    string = string.replace("}", ` collage=`);
  }

  for (let i = 0; i < result["{"]; i++) {
    string = string.replace("{", ` phone=`);
  }

  for (let i = 0; i < result[":"]; i++) {
    string = string.replace(":", ` city=`);
  }

  var temp = string.split(" ");

  temp.forEach((element) => {
    if (element.includes("fname")) {
      const t = element.split("=");
      fnames.push(t[1]);
    }
  });

  temp = string.split(" ");
  temp.forEach((element) => {
    if (element.includes("lname")) {
      const t = element.split("=");
      lnames.push(t[1]);
    }
  });

  temp = string.split(" ");
  temp.forEach((element) => {
    if (element.includes("email")) {
      const t = element.split("=");
      emails.push(t[1]);
    }
  });

  temp = string.split(" ");
  temp.forEach((element) => {
    if (element.includes("collage")) {
      const t = element.split("=");
      collages.push(t[1]);
    }
  });

  temp = string.split(" ");
  temp.forEach((element) => {
    if (element.includes("phone")) {
      const t = element.split("=");
      phones.push(t[1]);
    }
  });

  temp = string.split(" ");
  temp.forEach((element) => {
    if (element.includes("city")) {
      const t = element.split("=");
      cities.push(t[1]);
    }
  });


  var concatedQuery = ``;
  for (let i = 0; i < fnames.length; i++) {
    concatedQuery = concatedQuery + `fname like "%${fnames[i]}%" or `;
  }

  var t2;

  if (fnames.length !== 0) {
    for (let i = 0; i < fnames.length; i++) {
      concatedQuery = concatedQuery + `fname like "%${fnames[i]}%" or `;
    }
    t2 = concatedQuery.split(" ");
    t2.pop();
    t2.pop();
    t2.push(")");
    t2.push("and");
    t2.push("(");
    concatedQuery = t2.join(" ");
  }


  var t3;

  if (lnames.length !== 0) {
    for (let i = 0; i < lnames.length; i++) {
      concatedQuery = concatedQuery + `lname like "%${lnames[i]}%" or `;
    }

    t3 = concatedQuery.split(" ");
    t3.pop();
    t3.pop();
    t3.push(")");
    t3.push("and");
    t3.push("(");
    concatedQuery = t3.join(" ");
  }


  var t4;

  if (emails.length !== 0) {
    for (let i = 0; i < emails.length; i++) {
      concatedQuery = concatedQuery + `email like "%${emails[i]}%" or `;
    }
    t4 = concatedQuery.split(" ");
    t4.pop();
    t4.pop();
    t4.push(")");
    t4.push("and");
    t4.push("(");
    concatedQuery = t4.join(" ");
  }


  var t5;

  if (collages.length !== 0) {
    for (let i = 0; i < collages.length; i++) {
      concatedQuery = concatedQuery + `collage like "%${collages[i]}%" or `;
    }
    t5 = concatedQuery.split(" ");
    t5.pop();
    t5.pop();
    t5.push(")");
    t5.push("and");
    t5.push("(");
    concatedQuery = t5.join(" ");
  }


  var t6;
  if (phones.length !== 0) {
    for (let i = 0; i < phones.length; i++) {
      concatedQuery = concatedQuery + `phone like "%${phones[i]}%" or `;
    }
    t6 = concatedQuery.split(" ");
    t6.pop();
    t6.pop();
    t6.push(")");
    t6.push("and");
    t6.push("(");
    concatedQuery = t6.join(" ");
  }


  var t7;

  if (cities.length !== 0) {
    for (let i = 0; i < cities.length; i++) {
      concatedQuery = concatedQuery + `city like "%${cities[i]}%" or `;
    }
    t7 = concatedQuery.split(" ");
    t7.pop();
    t7.pop();
    t7.push(")");
    t7.push("and");
    t7.push("(");
    concatedQuery = t7.join(" ");
  }

  const tmpp = concatedQuery.split(" ");
  tmpp.pop();
  tmpp.pop();
  concatedQuery = tmpp.join(" ");

  query = start + concatedQuery ;
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  con.query(query, function (err, result, fields) {
    if (err) return res.render("../views/error.ejs");
    if (result) {
      res.render("./task8/result", {
        result,
        fields,
      });
    } else res.send("no data found");
  });
};

module.exports = {
  result,
  insert,
};
