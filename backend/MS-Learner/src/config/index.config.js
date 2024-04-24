const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  AUTH_ROUTING_KEY: "Auth",
  COURSE_ROUTING_KEY: "Course",
  LEARNER_ROUTING_KEY: "Learner",
};
