const mysql = require("mysql2");

require("dotenv").config();

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.dbuser,
  password: process.env.dbpass,
  database: process.env.dbname,
  multipleStatements: true,
});

module.exports = con;
