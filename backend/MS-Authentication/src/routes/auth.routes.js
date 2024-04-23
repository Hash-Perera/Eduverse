const AuthService = require("../services/auth.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new AuthService();

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
};
