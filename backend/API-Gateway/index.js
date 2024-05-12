const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

//! Define custom middleware to handle connection errors
function connectionErrorHandler(err, req, res, next) {
  if (err && err.code === "ECONNREFUSED") {
    let errorMessage = "Unable to connect to service";

    if (req.path.startsWith("/ms-auth")) {
      errorMessage = "Unable to connect to Authentication service";
    } else if (req.path.startsWith("/ms-course")) {
      errorMessage = "Unable to connect to Course service";
    } else if (req.path.startsWith("/ms-learner")) {
      errorMessage = "Unable to connect to Learner service";
    } else if (req.path.startsWith("/ms-notification")) {
      errorMessage = "Unable to connect to Notification service";
    } else if (req.path.startsWith("/ms-payment")) {
      errorMessage = "Unable to connect to Payment service";
    }
    res.status(503).json({ success: false, message: errorMessage });
  } else {
    next(err);
  }
}

//! Initialize proxy middleware for each microservice
const proxyAuth = proxy("http://localhost:8001");
const proxyCourse = proxy("http://localhost:8002");
const proxyLearner = proxy("http://localhost:8003");
const proxyNotification = proxy("http://localhost:8004");
const proxyPayment = proxy("http://localhost:8005");

//! Mount proxy middleware for each microservice with error handling
app.use("/ms-auth", proxyAuth);
app.use("/ms-course", proxyCourse);
app.use("/ms-learner", proxyLearner);
app.use("/ms-notification", proxyNotification);
app.use("/ms-payment", proxyPayment);
app.use("/", (req, res) => {
  res.send("API Gateway is running");
});

//! Attach custom middleware to handle connection errors
app.use(connectionErrorHandler);

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
