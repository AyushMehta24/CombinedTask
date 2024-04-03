const express = require("express");
const controller = require("../controllers/jobAppFormControllers");
const passport = require("passport");
require("../middleware/middle")(passport);
const router = express.Router();

router.get(
  "/jobAppForm",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/jobAppForm/update",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.updated
);
router.get(
  "/jobAppForm/insert",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.form
);
router.post(
  "/jobAppForm/submitform",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.submitform
);
router.get(
  "/jobAppForm/update/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.update
);

module.exports = router;
