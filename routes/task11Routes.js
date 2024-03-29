const express = require("express");
const controller = require("../controllers/task11Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);
const router = express.Router();

router.get(
  "/task11",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/task11/city/:val",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.city
);

module.exports = router;
