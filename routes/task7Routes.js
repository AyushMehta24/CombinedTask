const express = require("express");
const controller = require("../controllers/task7Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task7",controller.home)
router.get("/task7/insert", controller.insert);
router.post("/task7/display", controller.display);
router.post("/task7/display/:page/:boom/:type", controller.display2);

module.exports = router;
