const path = require("path");

const task3 = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/task3/index.html"));
};

module.exports = { task3 };
