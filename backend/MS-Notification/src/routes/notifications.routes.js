const NotificationService = require("../services/notification.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new NotificationService();
  const baseurl = "/notification";
  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  app.post(`${baseurl}/create-dashboard`, async (req, res) => {
    const result = await service.DashboardNotification(req.body, res);
    res.send(result);
  });

  app.get(`${baseurl}/get-notifications-10`, async (req, res) => {
    return await service.getNotifications(req, res);
    // res.send(result);
  });

  app.put(`${baseurl}/mark-as-read/:id`, async (req, res) => {
    const notificationId = req.params.id;
    return await service.setAsMarked(notificationId, res);
  });

  app.post(`${baseurl}/send-email`, async (req, res) => {
    const { email, subject, message } = req.body;
    return await service.SendEmail(email, subject, message);
  });

  app.post(`${baseurl}/send-otp`, async (req, res) => {
    const { userId, otp, email } = req.body;
    const html = ` <h1>Hello user</h1> <p>Your OTP to change password ${otp}<p> <br> <p>Regards<br>Thank you<br>Eduverse</p> `;
    return await service.SendEmail(email, "Password Reset", html, res);
  });
};
