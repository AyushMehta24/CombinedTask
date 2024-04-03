const express = require("express");
const controller = require("../controllers/ticTacToeControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/ticTacToe",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.ticTacToe
);

module.exports = router;
