const express = require("express");
const app = express();
const loginTask = require("./routes/loginRoutes");
const task1Router = require("./routes/task1Routes");
const task2Router = require("./routes/task2Routes");
const task3Router = require("./routes/task3Routes");
const task4Router = require("./routes/task4Routes");
const task5Router = require("./routes/task5Routes");
const task6Router = require("./routes/task6Routes");
const task7Router = require("./routes/task7Routes");
const task8Router = require("./routes/task8Routes");
const task9Router = require("./routes/task9Routes");
const task10Router = require("./routes/task10Routes");
const task11Router = require("./routes/task11Routes");
const task12Router = require("./routes/task12Routes");
const task13Router = require("./routes/task13Routes");
const task14Router = require("./routes/task14Routes");
const path = require("path");
const bodyParser = require("body-parser");
require("./db")


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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
