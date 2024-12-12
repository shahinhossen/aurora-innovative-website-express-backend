const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const connectDB = require("./configs/connectDB");
const skillsRoute = require("./routes/skills.route");
const { uploadSingle } = require("./middleweres/multer");
const courseRoute = require("./routes/course.route");
const modulesRoute = require("./routes/courseModule.route");
const userRouter = require("./routes/user.route");
const auth = require("./middleweres/auth");
require("dotenv").config();


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookie());

connectDB();

//route

app.use("/api/v1/skills", uploadSingle, skillsRoute);

app.use("/api/v1/course", courseRoute);

app.use("/api/v1/course/module", modulesRoute);

app.use("/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
