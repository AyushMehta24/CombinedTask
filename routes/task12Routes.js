const express = require("express");
const controller = require("../controllers/task12Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);
const router = express.Router();

router.get(
  "/task12",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/task12/update",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.updated
);
router.get(
  "/task12/insert",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.form
);
router.post(
  "/task12/submitform",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.submitform
);
router.get(
  "/task12/update/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.update
);

module.exports = router;
