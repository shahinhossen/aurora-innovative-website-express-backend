const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const uploadFields = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);

const uploadSingle = upload.single("image");

module.exports = { uploadSingle, uploadFields };
