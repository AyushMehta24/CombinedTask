const express = require("express");
const app = express();
const loginTask = require("./loginRoutes");
const kukuCubeRouter = require("./kukuCubeRoutes");
const dynamicTableRouter = require("./dynamicTableRoutes");
const fileOperationRouter = require("./fileOperationRoutes");
const paginationRouter = require("./paginationRoutes");
const ticTacToeRouter = require("./ticTacToeRoutes");
const attendenceExamRouter = require("./attendenceExamRoutes");
const searchingDataRouter = require("./searchingDataRoutes");
const delimeterSearchRouter = require("./delimeterSearchRoutes");
const comboGenratorRouter = require("./comboGenratorRoutes");
const placeholderRouter = require("./placeholderRoutes");
const cityStateRouter = require("./cityStateRoutes");
const jobAppFormRouter = require("./jobAppFormRoutes");
const ajaxJobAppFormRouter = require("./ajaxJobAppFormRoutes");
const timeConverterRouter = require("./timeConverterRoutes");
const path = require("path");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname+"/views")))
app.get("/", (req, res) => {
  res.render("./loginTask/login" ,{text: "", incorrectAttempts: 0, riddle: "" } );
});

app.use("/", kukuCubeRouter);
app.use("/", dynamicTableRouter);
app.use("/", ticTacToeRouter);
app.use("/", fileOperationRouter);
app.use("/", paginationRouter);
app.use("/", attendenceExamRouter);
app.use("/", searchingDataRouter);
app.use("/", delimeterSearchRouter);
app.use("/", comboGenratorRouter);
app.use("/", placeholderRouter);
app.use("/", cityStateRouter);
app.use("/", jobAppFormRouter);
app.use("/", ajaxJobAppFormRouter);
app.use("/", timeConverterRouter);

app.use("/", loginTask);


module.exports = app;
