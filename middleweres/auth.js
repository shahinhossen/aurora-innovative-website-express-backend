const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(400).json({ message: "Invalid token!" });
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log("Authorization error", error.message);
  }
};

module.exports = auth;
