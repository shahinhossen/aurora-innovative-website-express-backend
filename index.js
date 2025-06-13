const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const connectDB = require("./configs/connectDB");
const skillsRoute = require("./routes/skills.route");
const { uploadSingle } = require("./middleweres/multer");
const courseRoute = require("./routes/course.route");
const modulesRoute = require("./routes/courseModule.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
require("dotenv").config();


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookie());

connectDB();

//routes

// admin routes
app.use("/aurora/api/v1/admin", adminRouter)


app.use("/api/v1/skills", uploadSingle, skillsRoute);


app.use("/api/v1/course", courseRoute);

app.use("/api/v1/course/module", modulesRoute);

// user routes

app.use("/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
