var express = require("express");
var app = express();
const fs = require("fs");
var url = require("url");

var filePath = "./views/textFiles/user.txt";
app.use(express.urlencoded({ extended: true }));

const home = function (req, res) {
  res.render("./task4/pages/index");
};

const form = function (req, res) {
  res.render("./task4/pages/form");
};

const submited = function (req, res) {
  let userDataArray = [];
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) console.log(err);
      if (data.length == 0) {
        const temp = req.body;
        temp.id = generateUniqueId();
        userDataArray.push(temp);
        fs.writeFileSync(filePath, JSON.stringify(userDataArray));
      } else {
        console.log("dbvjsvsvh");
        userDataArray = JSON.parse(data);
        const temp = req.body;
        temp.id = generateUniqueId();
        userDataArray.push(temp);
        fs.writeFileSync(filePath, JSON.stringify(userDataArray));
      }
    });
  } else {
    console.log("else");
    return res.send("Filepath is not valid");
  }
  res.send("Data inserted successfully!");
};

const userlist = function (req, res) {
  const userDataArray = JSON.parse(fs.readFileSync(filePath));
  if (userDataArray.length == 0) {
    return res.send("there is no user");
  } else {
    res.render("./task4/partials/displaylist", { data: userDataArray });
  }
};

const userdetails = function (req, res) {
  var url1 = url.parse(req.url, true);
  const qdata = url1.query;

  const userDataArray = JSON.parse(fs.readFileSync(filePath));
  const userData = userDataArray.find((user) => user.id === qdata.id);
  const finalData = userData;
  delete finalData.id;
  const finalarray = [];
  finalarray.push(Object.values(finalData));
  if (finalData) {
    return res.render("./task4/partials/userdetails", { data: finalarray[0] });
  } else {
    res.send("User not found");
  }
};

function generateUniqueId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

module.exports = {
  form,
  submited,
  userlist,
  userdetails,home
};
