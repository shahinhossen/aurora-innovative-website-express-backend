const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");
const imageBbUrl = require("../configs/imageBB");

const registerUser = async (req, res) => {
  if (!req.file || !req.file.buffer)
    return res.status(400).json({ message: "Image is required" });
  const { email, username, phone, fullname, password } = req.body || {};
  const {buffer} = req.file;
  try {
    const checkExistUser = await User.findOne({ email });
    if (checkExistUser) return res.status(400).json({message:"This user already exist"});
    const avatar = await imageBbUrl(buffer)
    const newUser = await User({
      fullname: fullname,
      username: username,
      email: email,
      phone: phone,
      password: password,
      avatar: avatar
    });

    const authToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie("token", authToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      secure: true,
      SameSite: "Lax"
    });

    await newUser.save();

    //generate code
    let verificationCode = "";
    const generateCode = () => {
      verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    };
    generateCode();

    const user = await User.findByIdAndUpdate(
      newUser._id,
      {
        OTP: verificationCode,
        otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000),
      },
      { new: true }
    );

    //Mail Trap

    const client = new MailtrapClient({
      endpoint: process.env.MAIL_TRAP_ENDPOINT,
      token: process.env.MAIL_TRAP_TOKEN,
    });

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Aurora Innovative",
    };

    const recipients = [{ email: user.email }];

    client
      .send({
        from: sender,
        to: recipients,
        subject: "Account Verification Code",
        text: `Your account verification code is ${user.OTP}`,
      })
      .then((response) => console.log("Email sent:", response))
      .catch((error) => console.error("Error sending email:", error));

    //Mail trap end

    res.status(200).json({id: user._id, email: user.email});
  } catch (error) {
    console.log("User register error", error);
  }
};

const loginUser = async (req, res) => {
  const { username, email, phone, password } = req.body || {};
  try {
    const user = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (!user) return res.status(400).json({message: "You don't have an account"});
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).json({message: "Wrong password"});

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie("token", authToken, {
      httpOnly: true,
      secure: true,
      SameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({user, authToken});
  } catch (error) {
    console.log("Login error", error);
  }
};

const verifiUser = async (req, res) => {
  const { code } = req.body;
  if (!code)
    return res.status(400).json({ message: "Verification code is required!" });

  try {
    const user = await User.findById(req.params.userId);

    if (user.OTP !== code || user.otpExpiresAt < Date.now())
      return res.status(400).json({ message: "Invalid verification code" });

    const verifiedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: true, OTP: null, otpExpiresAt: null },
      { new: true }
    );

    res.status(200).json({ message: "Verification successfull", verifiedUser });
  } catch (error) {
    console.log("error in user verification", error);
    res.status(400).json({ message: "Verifiy user error" });
  }
};

const reSendVerificationCode = async (req, res) => {
  try {
    const user = await User.findOne(req.params.id);

    let verificationCode = "";
    const generateCode = () => {
      verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    };
    generateCode();

    const updateOTP = await User.findByIdAndUpdate(
      user._id,
      {
        OTP: verificationCode,
        otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000),
      },
      { new: true }
    );

    // Mail Trap

    const client = new MailtrapClient({
      endpoint: process.env.MAIL_TRAP_ENDPOINT,
      token: process.env.MAIL_TRAP_TOKEN,
    });

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Aurora Innovative",
    };

    const recipients = [{ email: user.email }];

    client
      .send({
        from: sender,
        to: recipients,
        subject: "Account Verification Code",
        text: `Your account verification code is ${updateOTP.OTP}`,
      })
      .then((response) => console.log("Email sent:", response))
      .catch((error) => console.error("Error sending email:", error));

    //Mail trap end

    res
      .status(200)
      .json({
        message: "Your verification was sent. please check your email"
      });
  } catch (error) {
    console.log("error in resend verification code", error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {httpOnly: true, secure: true, SameSite: "Lax"});
  res.status(200).json("User Logout succesfully")
}

module.exports = {
  registerUser,
  loginUser,
  verifiUser,
  reSendVerificationCode,
  logout
};
