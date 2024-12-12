const express = require("express");
const { registerUser, loginUser, verifiUser, reSendVerificationCode, logout } = require("../controllers/user.controller");
const { uploadSingle } = require("../middleweres/multer");

const router = express.Router();

router.post("/register", uploadSingle, registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/verify/:userId", verifiUser);
router.post("/resend/:userId", reSendVerificationCode);

module.exports = router;
