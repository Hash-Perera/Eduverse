const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Producer = require("./producer");

const producer = new Producer();
app.use(bodyParser.json("application/json"));

app.post("/sendLog", async (req, res) => {
  await producer.publishMessage(
    req.body.routingKey,
    req.body.event,
    req.body.data
  );
  res.send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
