const express = require("express");
const controller = require("../controllers/fileOperationControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/fileOperation",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.home
);

router.get(
  "/fileOperation/form",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.form
);

router.post(
  "/fileOperation/submited",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.submited
);

router.get(
  "/fileOperation/userlist",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.userlist
);

router.get(
  "/fileOperation/userdetails",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.userdetails
);

module.exports = router;
