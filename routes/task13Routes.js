const express = require("express");
const controller = require("../controllers/task13Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();


router.get("/task13",controller.home)
router.get("/task13/form",controller.display)
router.get("/task13/update",controller.updated)
router.get("/task13/validate",controller.validate)
router.post("/task13/submitform",controller.submit)
router.get("/task13/update/:id",controller.update)

module.exports = router;
