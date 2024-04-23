const User = require("../schema/user.schema");

class AuthService {
  //?This is the remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "REGISTER":
        this.Register(payload);
        break;
      default:
        break;
    }
  }

  //! Need to implement other service functions here --
  async Register(payload) {
    console.log(payload.data);
  }
}

module.exports = AuthService;
