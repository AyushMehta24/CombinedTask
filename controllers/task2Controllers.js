const path = require("path");

const task2 = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/task2/dynamicTable.html"));
};

module.exports = { task2 };
