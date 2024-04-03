const path = require("path");

const ticTacToe = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/ticTacToe/index.html"));
};

module.exports = { ticTacToe };
