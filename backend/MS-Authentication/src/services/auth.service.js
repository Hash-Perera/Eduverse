class AuthService {
  async SubscribeEvents(payload) {
    console.log("Auth service recieved an event");
    console.log(payload);
    //Need to add a switch case to choose the correct service function
  }

  //! Need to implement other service functions here --
}

module.exports = AuthService;
