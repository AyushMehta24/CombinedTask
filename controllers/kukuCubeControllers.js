const path = require("path");

const kukuCube = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/kukuCube/kuku.html"));
};

module.exports = { kukuCube };
