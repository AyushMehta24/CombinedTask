const express = require("express");
const controller = require("../controllers/searchingDataControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/searchingData",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.home
);
router.get(
  "/searchingData/insert",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.insert
);
router.post(
  "/searchingData/display",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.post(
  "/searchingData/display/:page/:boom/:type",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display2
);

module.exports = router;
