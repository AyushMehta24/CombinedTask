const express = require("express");
const passport = require("passport");
const controller = require("../controllers/loginControllers");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/loginTask/login", controller.login);

router.post("/loginTask/login", controller.postLogin);

router.get(
  "/protected",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/loginTask/login",
  }),
  (req, res) => {
    // If JWT is valid, proceed to the protected router

    return res.render("index");
  }
);

router.get("/loginTask/register", controller.register);

router.post("/loginTask/register", controller.postRegister);

router.get("/loginTask/activate/:token", controller.activateToken);

//forgot password

router.get("/loginTask/forgotpass", controller.forgotpass);

router.post("/loginTask/setpass", controller.setpass);

router.get("/loginTask/reset/:uid/:activationToken", controller.reset);

router.post("/loginTask/checkpass/:uid/:activationToken", controller.checkpass);

module.exports = router;
