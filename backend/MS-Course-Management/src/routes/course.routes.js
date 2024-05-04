const CourseService = require("../services/course.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new CourseService();
  const baseUrl = "/course";

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  //TODO: complete this functions
  app.post(`${baseUrl}/create`, async (req, res) => {
    console.log("This is course route");
    console.log(req.user);
    res.send({ msg: "course created" });
  });
};
