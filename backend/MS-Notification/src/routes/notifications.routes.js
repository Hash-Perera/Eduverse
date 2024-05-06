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
};
