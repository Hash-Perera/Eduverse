class CourseService {
  //? This is remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "CREATE_COURSE":
        this.CreateCourseTest(payload);
        break;
      case "GET_COURSES":
        this.R_getCourses();
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

  //! =======  DO not Delete this function =========
  async R_getCourses() {
    console.log("Get courses list");
    return [
      {
        name: "Course 1",
        price: "100",
      },
      {
        name: "Course 2",
        price: "200",
      },
    ];
  }
}

module.exports = CourseService;
