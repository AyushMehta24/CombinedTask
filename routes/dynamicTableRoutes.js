const express = require("express");
const controller = require("../controllers/dynamicTableControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/dynamicTable",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.dynamicTable
);

module.exports = router;
