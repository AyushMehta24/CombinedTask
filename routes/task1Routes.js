const express = require("express");
const controller = require("../controllers/task1Controllers");

const router = express.Router();

router.get("/task1", controller.task1);

module.exports = router;
