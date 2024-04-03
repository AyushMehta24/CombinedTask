const express = require("express");
const controller = require("../controllers/placeholderControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/placeholder",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.post
);

router.get(
  "/placeholder/post/:postid",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.comment
);
module.exports = router;
