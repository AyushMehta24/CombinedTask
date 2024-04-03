const express = require("express");
const controller = require("../controllers/ajaxJobAppFormControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
  "/ajaxJobAppForm",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.home
);
router.get(
  "/ajaxJobAppForm/form",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/ajaxJobAppForm/update",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.updated
);
router.get(
  "/ajaxJobAppForm/validate",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.validate
);
router.post(
  "/ajaxJobAppForm/submitform",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.submit
);
router.get(
  "/ajaxJobAppForm/update/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.update
);

module.exports = router;
