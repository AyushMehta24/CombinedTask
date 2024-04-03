const path = require("path");

const dynamicTable = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dynamicTable/dynamicTable.html"));
};

module.exports = { dynamicTable };
