const express = require("express");
const cors = require("cors");
const AuthGuard = require("../src/middlewares/Auth.middleware");
const CourseRoute = require("../src/routes/course.routes");
const LessonRoute = require("../src/routes/lesson.routes");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static("uploads/Images"));

  app.use(AuthGuard);
  CourseRoute(app);
  LessonRoute(app);
};
