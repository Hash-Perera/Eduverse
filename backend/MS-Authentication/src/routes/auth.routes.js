const AuthService = require("../services/auth.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new AuthService();
  const baseurl = "/user";

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  app.post(`${baseurl}/register`, async (req, res) => {
    const result = await service.Register(req.body, res);
    res.send(result);
  });

  app.post(`${baseurl}/login`, async (req, res) => {
    const result = await service.Login(req.body, res);
    res.send(result);
  });

  //! =======  DO not Delete this function =========
  app.post(`${baseurl}/register-test`, async (req, res) => {
    const result = await service.RegisterTest(req.body, res, channel);
    res.send(result);
  });
};
