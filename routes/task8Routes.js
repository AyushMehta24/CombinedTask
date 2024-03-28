const express = require("express");
const controller = require("../controllers/task8Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task8", controller.insert);
router.post("/task8/result", controller.result);

module.exports = router;
