const express = require("express");
const mysql = require("mysql");
const app = express();
const task1Router = require("./routes/task1Routes");
const task2Router = require("./routes/task2Routes");

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", task1Router);
app.use("/", task2Router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
