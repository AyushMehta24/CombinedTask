const express = require("express");
const mysql = require("mysql");
const app = express();
const loginTask = require("./routes/loginRoutes");
const task1Router = require("./routes/task1Routes");
const task2Router = require("./routes/task2Routes");
const task3Router = require("./routes/task3Routes");
const task4Router = require("./routes/task4Routes");
const task5Router = require("./routes/task5Routes");
const task6Router = require("./routes/task6Routes");
const path = require("path");
const bodyParser = require("body-parser");
require("./db")

app.use(bodyParser.urlencoded({ extended: false }));
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
app.use("/", loginTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
