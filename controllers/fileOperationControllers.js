const express = require("express");
const app = express();
const fs = require("fs");
const { PassThrough } = require("stream");
const url = require("url");

const filePath = "./views/textFiles/user.txt";
app.use(express.urlencoded({ extended: true }));

const home = function (req, res) {
  res.render("./fileOperation/pages/index");
};

const form = function (req, res) {
  res.render("./fileOperation/pages/form");
};

const submited = function (req, res) {
  let userDataArray = [];
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      try {
        if (err) throw err;
        if (data.length == 0) {
          const temp = req.body;
          temp.id = generateUniqueId();
          userDataArray.push(temp);
          fs.writeFileSync(filePath, JSON.stringify(userDataArray));
        } else {
          userDataArray = JSON.parse(data);
          const temp = req.body;
          temp.id = generateUniqueId();
          userDataArray.push(temp);
          fs.writeFileSync(filePath, JSON.stringify(userDataArray));
        }
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.send("Filepath is not valid");
  }
  res.send("Data inserted successfully!");
};

const userlist = function (req, res) {
  const userDataArray = JSON.parse(fs.readFileSync(filePath));
  if (userDataArray.length == 0) {
    return res.send("there is no user");
  } else {
    res.render("./fileOperation/partials/displaylist", { data: userDataArray });
  }
};

const userdetails = function (req, res) {
  let url1 = url.parse(req.url, true);
  const qdata = url1.query;

  const userDataArray = JSON.parse(fs.readFileSync(filePath));
  const userData = userDataArray.find((user) => user.id === qdata.id);
  const finalData = userData;
  delete finalData.id;
  const finalarray = [];
  finalarray.push(Object.values(finalData));
  if (finalData) {
    return res.render("./fileOperation/partials/userdetails", { data: finalarray[0] });
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
  userdetails,
  home,
};
