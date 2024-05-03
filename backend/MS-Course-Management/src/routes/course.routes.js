const CourseService = require("../services/course.service");
const { SubscribeMessages } = require("../utils/index.utils");
const AuthMiddleware = require("../middlewares/auth.middleware");

module.exports = (app, channel) => {
  const service = new CourseService();
  const baseUrl = "/course";

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  //TODO: complete this functions
  app.post(`${baseUrl}/create`, AuthMiddleware, async (req, res) => {
    //const result = await service.CreateCourse(req.body, res);
    console.log(req.body);
    console.log(req.user);
    res.send({ msg: "course created" });
  });
};
