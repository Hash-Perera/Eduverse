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
}
