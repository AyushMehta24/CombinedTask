const express = require("express");
const controller = require("../controllers/task2Controllers");

const router = express.Router();

router.get("/task2", controller.task2);

module.exports = router;
