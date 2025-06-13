const imageBbUrl = require("../configs/imageBB");
const Course = require("../models/course.models");
const CourseModule = require("../models/courseModule.model");

const addCourse = async (req, res) => {

  if (!req.file || !req.file.buffer)
    return res.status(400).json({ message: "Image is required" });
  const {title, description, price, discount, category, quickLook} = req.body;
  const {buffer} = req.file;
  try {
    const thumbnail = await imageBbUrl(buffer);
    const course = new Course({
      title: title,
      description: description,
      price: price,
      discount: discount,
      category: category,
      quickLook: quickLook,
      thumbnail: thumbnail,
    });
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.log("course adding error", error);
    res.status(400).json({message: "Something went wrong during add Course."})
  }
};

const getCourseById = async (req, res) => {
  try {
    const singleCourse = await Course.findById(req.params.id).populate(
      "courseModules"
    );
    res.status(200).json(singleCourse);
  } catch (error) {
    console.log("single course getting error", error);
    res.status(500).json("Internal server error please try again");
  }
};

const getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find();
    res.status(200).json(allCourse);
  } catch (error) {
    console.log("all course getting error", error);
  }
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await updatedCourse.save();
    if (!updateCourse) return res.status(404).json("Course not found");
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.log("course updating error", error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    const moduleId = course.courseModules
    if(moduleId) await CourseModule.findByIdAndDelete(moduleId)
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course Deleted Successfully");
  } catch (error) {
    console.log("course deleting error", error);
  }
};

module.exports = {
  addCourse,
  getCourseById,
  getAllCourse,
  updateCourse,
  deleteCourse,
};
