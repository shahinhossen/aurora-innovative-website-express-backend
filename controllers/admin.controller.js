const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { fullname, email, password } = req.body || {};
  try {
    if (!fullname || !email || !password)
      return res.status(401).json({ message: "All fields are required." });
    const existEmail = await Admin.findOne({ email });
    if (existEmail)
      return res.status(401).json({ message: "This email already used." });
    const newAdmin = new Admin({
      fullname,
      email,
      password,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created please login." });
  } catch (error) {
    console.log("Something went wrong while creating admin : ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    if (!email || !password)
      return res.status(401).json({ message: "All fields are required." });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "No admin found!" });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password." });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      SameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.log("Something went wrong while login admin : ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
};

module.exports = { createAdmin, loginAdmin };
