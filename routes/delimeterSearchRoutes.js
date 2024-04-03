const express = require("express");
const controller = require("../controllers/delimeterSearchControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/delimeterSearch",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.insert
);
router.post(
  "/delimeterSearch/result",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.result
);

module.exports = router;
