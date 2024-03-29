const express = require("express");
const controller = require("../controllers/task13Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task13",controller.display)
router.get("/task13/validate",controller.validate)
router.post("/task13/submitform",controller.submit)
router.get("/task13/update/:id",controller.update)

module.exports = router;
