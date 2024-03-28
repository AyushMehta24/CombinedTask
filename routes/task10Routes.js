const express = require("express");
const controller = require("../controllers/task10Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task10", controller.post);

router.get("/task10/post/:postid", controller.comment);
module.exports = router;
