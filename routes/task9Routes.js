const express = require("express");
const controller = require("../controllers/task9Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task9" , controller.display)
router.post("/task9/component" , controller.insert)

module.exports = router;
