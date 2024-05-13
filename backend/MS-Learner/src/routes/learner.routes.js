const LearnerService = require("../services/learner.service");
/* const { SubscribeMessages } = require("../utils/index.utils"); */

module.exports = (app) => {
  const service = new LearnerService();
  const baseurl = "/learner";
  /* 
  //To listen
  SubscribeMessages(channel, service); */

  app.post(`${baseurl}/enroll`, async (req, res) => {
    try {
      const body = {
        ...req.body,
        student_id: req.user.id,
      };
      const result = await service.enrollCourse(body, res);
      res.status(200).send(result);
    } catch (error) {
      // Handle the error here
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get(`${baseurl}/courses/`, async (req, res) => {
    try {
      const header = req.headers["authorization"];
      console.log(header);
      const token = header && header.split(" ")[1];

      const body = {
        ...req.body,
        student_id: req.user.id,
      };
      console.log(req.user.id);
      const result = await service.getEnrolledCourses(body, token);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //get enrolled course by id
  app.get(`${baseurl}/course/:courseId`, async (req, res) => {
    try {
      const header = req.headers["authorization"];
      const token = header && header.split(" ")[1];

      const params = {
        ...req.params,
        student_id: req.user.id,
      };
      const result = await service.getEnrolledCourseById(params, res, token);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //get course progress
  app.get(`${baseurl}/progress/:courseId`, async (req, res) => {
    try {
      const params = {
        ...req.params,
        student_id: req.user.id,
      };
      const result = await service.getCourseProgress(params, res);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //update course progress
  app.put(`${baseurl}/course/progress/`, async (req, res) => {
    try {
      const body = {
        ...req.body,
        student_id: req.user.id,
      };
      const result = await service.updateCourseProgress(body, res);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete(`${baseurl}/course/unenroll/:courseId`, async (req, res) => {
    try {
      const params = {
        ...req.params,
        student_id: req.user.id,
      };

      const result = await service.deleteEnrolledCourse(params, res);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  //monitor the progress of the course
  app.get(`${baseurl}/course/progress/:id`, async (req, res) => {
    try {
      const result = await service.monitorCourseProgress(req.params, res);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
};
