const LessonService = require("../services/lesson.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new LessonService();
  const baseUrl = "/lesson";

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  //Create lesson
  app.post(`${baseUrl}/create`, async (req, res) => {
    const result = await service.CreateLesson(req.body, res);
    res.send(result);
  });

  //Get All lessons
  app.get(`${baseUrl}/all`, async (req, res) => {
    const result = await service.GetAllLessons(res);
    res.send(result);
  });

  //delete lesson
  app.delete(`${baseUrl}/delete`, async (req, res) => {
    const result = await service.DeleteLesson(req.body, res);
    res.send(result);
  });

  //update lesson
  app.put(`${baseUrl}/update`, async (req, res) => {
    const result = await service.UpdateLesson(req.body, res);
    res.send(result);
  });
};
