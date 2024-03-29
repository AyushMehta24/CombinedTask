const express = require("express");
const controller = require("../controllers/task12Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);
const router = express.Router();

router.get("/task12",controller.display)
router.get("/task12/update",controller.updated)
router.get("/task12/insert", controller.form);
router.post("/task12/submitform", controller.submitform);
router.get("/task12/update/:id", controller.update);

module.exports = router;


