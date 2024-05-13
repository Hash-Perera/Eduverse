const express = require("express");
const cors = require("cors");
const AuthGuard = require("../src/middlewares/auth-guard");
const LearnerRoute = require("../src/routes/learner.routes");
module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  app.use(AuthGuard);

  LearnerRoute(app);

  //! Your routes.. Refer course MS routes implementation
};
