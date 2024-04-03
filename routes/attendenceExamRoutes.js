const express = require("express");
const controller = require("../controllers/attendenceExamControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/attendenceExam",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.home
);
router.get(
  "/attendenceExam/display",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/attendenceExam/exam",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.exam
);
router.get(
  "/attendenceExam/studentdetails",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.studentdetails
);
router.post(
  "/attendenceExam/exam/filter",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.exampost
);

module.exports = router;

