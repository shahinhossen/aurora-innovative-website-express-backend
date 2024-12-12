const uploadImage = require("../configs/cloudinary");
const Skills = require("../models/skill.models");

const addSkill = async (req, res) => {
  const { title } = req.body || {};
  if (!req.file || !req.file.buffer)
    return res.status(400).json({ message: "Icon is required" });
  console.log(req.file.buffer)
  try {
    const imageUpload = await uploadImage(req.file.buffer, "icon");
    console.log("test")
    const imageUrl = imageUpload.secure_url;
    const skill = new Skills({
      title: title,
      icon: imageUrl,
    });
    await skill.save();
    res.status(200).json(skill);
  } catch (error) {
    console.log("skill adding error", error);
    res
      .status(500)
      .json({ message: "Internal Server error. Please try again" });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skills.findByIdAndDelete(req.params.id)
    if(!deletedSkill) return res.status(400).json("Skill not found");
    res.status(200).json("Skill deleted successfully")
  } catch (error) {
    console.log("Skill deleting error", error)
  }
}

module.exports = {addSkill, deleteSkill};
