const express = require("express");
const controller = require("../controllers/cityStateControllers");
const passport = require("passport");
require("../middleware/middle")(passport);
const router = express.Router();

router.get(
  "/cityState",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/cityState/city/:val",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.city
);

module.exports = router;
