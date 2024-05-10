const AuthService = require("../services/auth.service");
//const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new AuthService();
  const baseurl = "/user";

  //To listen
  //SubscribeMessages(channel, service);

  //Other routes
  app.post(`${baseurl}/register`, async (req, res) => {
    const result = await service.Register(req.body, res);
    res.send(result);
  });

  app.post(`${baseurl}/login`, async (req, res) => {
    const result = await service.Login(req.body, res);
    res.send(result);
  });

  app.post(`${baseurl}/validate`, async (req, res) => {
    const result = await service.Validate(req.user, res);
    res.send(result);
  });

  app.put(`${baseurl}/update`, async (req, res) => {
    return await service.Update(req.user, req.body, res);
  });

  //! =======  DO not Delete this function =========
  app.post(`${baseurl}/register-test`, async (req, res) => {
    const result = await service.RegisterTest(req.body, res, channel);
    res.send(result);
  });

  app.get(`${baseurl}/details`, async (req, res) => {
    return await service.GetDetails(req.user, res);
  });

  app.get(`${baseurl}/send-otp`, async (req, res) => {
    return await service.sendOtpToNotificationService(req, req.user, res);
  });

  app.post(`${baseurl}/reset-password`, async (req, res) => {
    const userId = req.user;
    return await service.ResetPassword(req, userId, req.body, res);
  });
};
