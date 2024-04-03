const express = require("express");
const controller = require("../controllers/kukuCubeControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/kukuCube",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.kukuCube
);

module.exports = router;
