const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Skills = mongoose.model("Skills", skillSchema);

module.exports = Skills;
