const express = require("express");
const expressApp = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const StartServer = async () => {
  //! Load environment variables
  dotenv.config();
  const PORT = process.env.PORT || 8001;
  const URL = process.env.MONGODB_URI;

  const app = express();

  //! Connect to MongoDB
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  await expressApp(app);

  app.listen(PORT, () => {
    console.log(`Authentication Microservice running on ${PORT}`);
  });
};

StartServer();
