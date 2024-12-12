const express = require("express");
const {addSkill, deleteSkill} = require("../controllers/skills.controller");

const router = express.Router();

router.post("/add", addSkill);
router.delete("/delete", deleteSkill);

module.exports = router;
