const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes")
const path = require("path");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname+"/views")))
app.get("/", (req, res) => {
  res.render("./loginTask/login" ,{text: "", incorrectAttempts: 0, riddle: "" } );
});

app.use("/",mainRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
