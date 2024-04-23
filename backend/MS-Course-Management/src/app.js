const express = require("express");
const cors = require("cors");
const CourseRoute = require("../src/routes/course.routes");

module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(cors());

  CourseRoute(app, channel);
};
