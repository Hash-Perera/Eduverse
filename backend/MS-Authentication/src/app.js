const express = require("express");
const cors = require("cors");
const { AuthGuard } = require("../src/middlewares/auth-guard");
const AuthRoute = require("../src/routes/auth.routes");
const RoleRoute = require("../src/routes/role.routes");
module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  app.use(AuthGuard);

  AuthRoute(app);
  RoleRoute(app);
};
