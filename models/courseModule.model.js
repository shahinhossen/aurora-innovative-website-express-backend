const mongoose = require("mongoose");

// CourseModule Model
const courseModuleSchema = new mongoose.Schema({
  title: String,
  description: String,
  class: {
    type: String,
  },
  projects: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const CourseModule = mongoose.model("CourseModule", courseModuleSchema);
module.exports = CourseModule;
