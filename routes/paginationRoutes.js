const express = require("express");
const controller = require("../controllers/paginationControllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get(
    "/pagination",
    passport.authenticate("jwt", {
      session: false,
      failureRedirect: "/loginTask/login",
    }),
    controller.home
  );

router.get(
  "/pagination/display",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.display
);
router.get(
  "/pagination/component",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.component
);
router.get(
  "/pagination/order",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  controller.order
);

module.exports = router;
