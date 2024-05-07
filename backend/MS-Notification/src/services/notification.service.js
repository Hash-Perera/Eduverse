const Notification = require("../schema/notification.schema");
const nodeMailer = require("nodemailer");

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
      case "DASHBOARD_NOTIFICATION":
        this.DashboardNotification(payload.data);
        break;
      case "EMAIL":
        this.SendEmail(
          payload.data.email,
          payload.data.subject,
          payload.data.message
        );
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
      data: notifications.reverse(),
      message: "Notifications Fetched",
    });
  }

  async setAsMarked(notificationId, res) {
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      viewed: true,
    });
    res.status(200).send({
      success: true,
      data: notification,
      message: "Notification Marked as Read",
    });
  }

  //! Email service
  async SendEmail(email, subject, message, res) {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const html = `
    <h1>Dear student</h1>
    <p>Your time table has been changed. Please refer to the LMS for updated timetable<p>
    <br>
    <p>Regards<br>Thank you<br>Student Affairs SLIIT</p> `;

    const info = await transporter.sendMail({
      from: "vhprabhathperera222@gmail.com",
      to: email,
      subject: subject,
      html: message,
    });

    res.status(200).send({
      success: true,
      data: info,
      message: "Email Sent",
    });
  }
}

module.exports = NotificationService;
