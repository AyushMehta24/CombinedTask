const express = require("express");
const controller = require("../controllers/task3Controllers");

const router = express.Router();

router.get("/task3", controller.task3);

module.exports = router;
