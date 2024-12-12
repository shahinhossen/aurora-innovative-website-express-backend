const axios = require("axios");

const imageBbUrl = async (buffer) => {
  try {
    const base64Image = buffer.toString("base64");

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_BB_API}`,
      new URLSearchParams({
        image: base64Image,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.data.display_url;
  } catch (error) {
    console.log("Image BB Url Error", error.message)
    res.status(400).json({message: "Image BB Url Problem."})
  }
};

module.exports = imageBbUrl;