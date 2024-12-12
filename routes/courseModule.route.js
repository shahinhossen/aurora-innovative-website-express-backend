const express = require("express");
const {
  addModule,
  updateModule,
} = require("../controllers/courseModule.controller");

const router = express.Router();

router.post("/add", addModule);

router.post("/update", updateModule);

module.exports = router;
