const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.DATABASE_URL}`)
      .then(() => console.log("Database connected"));
  } catch (error) {
    console.log("Database connection error =", error.message);
  }
};

module.exports = connectDB;
