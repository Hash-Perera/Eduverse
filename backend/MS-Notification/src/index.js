const express = require("express");
const expressApp = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { CreateChannel } = require("./utils/index.utils");

const StartServer = async () => {
  //! Load environment variables
  dotenv.config();
  const PORT = process.env.PORT || 8004;
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

  // //! Create channel
  const channel = await CreateChannel();

  await expressApp(app, channel);
  //-//
  app.listen(PORT, () => {
    console.log(`Notification Management Microservice running on ${PORT}`);
  });
};

StartServer();
