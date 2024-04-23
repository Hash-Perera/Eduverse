class CourseService {
  //? This is remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "CREATE_COURSE":
        this.CreateCourseTest(payload);
        break;
      default:
        break;
    }
  }

  //TODO: Implement other service functions here ---------------------------------
  async CreateCourseTest(payload) {
    console.log("Create course test");
    console.log(payload.data);
  }
}

module.exports = CourseService;
