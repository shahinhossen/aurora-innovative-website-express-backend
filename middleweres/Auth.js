const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  // Check token in cookies or headers
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token needed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach admin details to request
    next(); // Move to next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = Auth;
