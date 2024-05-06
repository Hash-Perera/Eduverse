const Notification = require("../schema/notification.schema");

class NotificationService {
  //? This is remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "EMAIL_NOTIFICATION":
        this.EmailNotification(payload);
        break;
      case "ON_BOARD":
        this.OnBoard();
        break;
      default:
        break;
    }
  }

  async EmailNotification(payload) {
    console.log("Email notification test");
    console.log(payload.data);
  }

  async OnBoard(payload) {
    console.log("Onboard notification test");
  }

  async DashboardNotification(payload, res) {
    const newNotification = await Notification.create(payload);
    res.status(200).send({
      success: true,
      data: newNotification,
      message: "Notification Added",
    });
  }

  async getNotifications(req, res) {
    const userId = req.user.id;
    const notifications = await Notification.find({ userId: userId });
    return res.status(200).send({
      success: true,
      data: notifications,
      message: "Notifications Fetched",
    });
  }
}

module.exports = NotificationService;
