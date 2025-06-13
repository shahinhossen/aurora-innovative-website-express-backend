const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      require: true,
      default: "https://placehold.co/600x400/000000/FFFFFF/png",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: "0",
    },
    discount: {
      type: String,
      required: true,
      default: "0",
    },
    finalPrice: {
      type: String,
      default: "0",
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    courseModules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseModule",
      },
    ],
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    quickLook: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
