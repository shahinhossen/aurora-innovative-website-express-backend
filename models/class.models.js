const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String
});

const Classes = mongoose.model("Classes", classSchema);

module.exports = Classes;
