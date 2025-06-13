const express = require("express");
const {
  addCourse,
  getCourseById,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const { uploadSingle } = require("../middleweres/multer");
const Auth = require("../middleweres/Auth");

const router = express.Router();

router.post("/add", Auth, uploadSingle, addCourse);

router.get("/single/:id", getCourseById);

router.get("/all", getAllCourse);

router.put("/update/:id", updateCourse);

router.delete("/delete/:id", deleteCourse);

module.exports = router;