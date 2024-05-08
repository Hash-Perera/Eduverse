const LearnerService = require("../services/learner.service");
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new LearnerService();
  const baseurl = "/learner";

  //To listen
  SubscribeMessages(channel, service);

  app.post(`${baseurl}/enroll`, async (req, res) => {
    try {
      const result = await service.enrollCourse(req.body, res);
      res.status(200).send(result);
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get(`${baseurl}/courses`, async (req, res) => {
    try {
      const header = req.headers["authorization"];
      const token = header && header.split(" ")[1];

      const result = await service.getEnrolledCourses(req.body, res, token);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //get enrolled course by id
  app.get(`${baseurl}/course/`, async (req, res) => {
    try {
      const header = req.headers["authorization"];
      const token = header && header.split(" ")[1];
      const result = await service.getEnrolledCourseById(req.body, res, token);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //get course progress
  app.get(`${baseurl}/progress/`, async (req, res) => {
    const result = await service.getCourseProgress(req.body, res);
    res.send(result);
  });

  //update course progress
  app.put(`${baseurl}/course/progress`, async (req, res) => {
    try {
      const result = await service.updateCourseProgress(req.body, res);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete(`${baseurl}/course/unenroll`, async (req, res) => {
    try {
      const result = await service.deleteEnrolledCourse(req.body, res);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};
