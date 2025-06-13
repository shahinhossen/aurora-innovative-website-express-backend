const Course = require("../models/course.models");
const CourseModule = require("../models/courseModule.model")


const addModule = async (req, res) => {
  try {
    const {course} = req.body;
    const newModule = new CourseModule(req.body);
    await newModule.save();
    await Course.findByIdAndUpdate(course, {
      $push: {courseModules: newModule._id}
    })
    res.status(200).json(newModule)
  } catch (error) {
    console.log("module adding error", error)
  }
}

const updateModule = async (req, res) => {
  try {
    const updatedModule = await CourseModule.findByIdAndUpdate(req.params.id, req.body, {new: ture})
    await updatedModule.save();
    res.status(200).json(updatedModule);
  } catch (error) {
    console.log("module updating error", error)
  }
}


module.exports = {addModule, updateModule}