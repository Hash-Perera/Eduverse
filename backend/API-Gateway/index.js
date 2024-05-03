const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ms-auth", proxy("http://localhost:8001"));
app.use("/ms-course", proxy("http://localhost:8002"));
app.use("/ms-learner", proxy("http://localhost:8003"));
app.use("/ms-notification", proxy("http://localhost:8004"));
app.use("/ms-payment", proxy("http://localhost:8005"));

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
