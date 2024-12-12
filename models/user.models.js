const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp"
    },
    phone: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    OTP: String,
    otpExpiresAt: Date,
    
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("password encryption error = ", error.message);
    next();
  }
});

userSchema.methods.comparePassword = async function(password){
  return await bcryptjs.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
