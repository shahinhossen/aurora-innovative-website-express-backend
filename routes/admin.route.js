const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/admin.controller");
const router = express.Router();

router.post("/sign-up", createAdmin)
router.post("/sign-in", loginAdmin)

module.exports = router;