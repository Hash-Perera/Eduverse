const express = require("express");
const expressApp = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
/* const { CreateChannel } = require("./utils/index.utils"); */

// function for Starting the server

const StartServer = async () => {
  //loading enviroment variables

  dotenv.config();
  const PORT = process.env.PORT || 8005;
  const URL = process.env.MONGODB_URI;

  const app = express();

  //Connecting the mongoDB

  mongoose
    .connect(URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  /*   // Create channel
    const channel = await CreateChannel(); */

  await expressApp(app);
  //-//
  app.listen(PORT, () => {
    console.log(`Payment Management Microservice running on ${PORT}`);
  });
};

StartServer();
