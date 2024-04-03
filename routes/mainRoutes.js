const express = require("express");
const app = express();
const loginTask = require("./loginRoutes");
const task1Router = require("./task1Routes");
const task2Router = require("./task2Routes");
const task4Router = require("./task4Routes");
const task5Router = require("./task5Routes");
const task3Router = require("./task3Routes");
const task6Router = require("./task6Routes");
const task7Router = require("./task7Routes");
const task8Router = require("./task8Routes");
const task9Router = require("./task9Routes");
const task10Router = require("./task10Routes");
const task11Router = require("./task11Routes");
const task12Router = require("./task12Routes");
const task13Router = require("./task13Routes");
const task14Router = require("./task14Routes");
const path = require("path");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname+"/views")))
app.get("/", (req, res) => {
  res.render("./loginTask/login" ,{text: "", incorrectAttempts: 0, riddle: "" } );
});

app.use("/", task1Router);
app.use("/", task2Router);
app.use("/", task3Router);
app.use("/", task4Router);
app.use("/", task5Router);
app.use("/", task6Router);
app.use("/", task7Router);
app.use("/", task8Router);
app.use("/", task9Router);
app.use("/", task10Router);
app.use("/", task11Router);
app.use("/", task12Router);
app.use("/", task13Router);
app.use("/", task14Router);

app.use("/", loginTask);


module.exports = app;
