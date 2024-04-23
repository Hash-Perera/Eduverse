const CourseService = require("../services/course.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new CourseService();

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  app.post("/createCourse", async (req, res) => {
    //const result = await service.CreateCourse(req.body, res);
    res.send({ msg: "course created" });
  });
};
