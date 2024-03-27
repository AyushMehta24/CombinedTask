const path = require("path");

const task1 = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/task1/kuku.html"));
};

module.exports = { task1 };
