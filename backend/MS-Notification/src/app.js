const express = require("express");
const cors = require("cors");
const AuthGuard = require("../src/middlewares/auth-guard");
const http = require("http");
const { Server } = require("socket.io");
const NotificationRoute = require("./routes/notifications.routes");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  app.use(AuthGuard);
  //! Your routes.. Refer course MS routes implementation
  NotificationRoute(app);
};
