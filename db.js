const mysql = require("mysql");

require("dotenv").config()

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.dbuser,
  password: process.env.dbpass,
  database: process.env.dbname,
});

module.exports = con;
