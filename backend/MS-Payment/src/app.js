const express = require("express");
const cors = require("cors");
const AuthGuard = require("../src/middlewares/Auth.middleware");
const PaymentRoute = require("../src/routes/payment.routes");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  app.use(AuthGuard);
  PaymentRoute(app);
};
