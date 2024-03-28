const express = require("express");
const controller = require("../controllers/task6Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task6",controller.home)
router.get("/task6/display", controller.display);
router.get("/task6/exam", controller.exam);
router.get("/task6/studentdetails", controller.studentdetails);
router.post("/task6/exam/filter", controller.exampost);

module.exports = router;
