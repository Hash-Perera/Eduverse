const CourseService = require("../services/course.service");
const { SubscribeMessages } = require("../utils/index.utils");
const upload = require("../utils/multerConfig");
module.exports = (app, channel) => {
  const service = new CourseService();
  const baseUrl = "/course";

  //To listen
  SubscribeMessages(channel, service);

  //Other routes
  //TODO: complete this functions
  /*   app.post(`${baseUrl}/create`, async (req, res) => {
    const result = await service.CreateCourse(req.body, res);
    res.send(result);
  }); */

  app.put(`${baseUrl}/status-update`, async (req, res) => {
    const result = await service.UpdateCourseStatus(req.body, res);
    res.send(result);
  });

  app.get(`${baseUrl}/get-by-id`, async (req, res) => {
    const result = await service.GetCourseById(req.body, res);
    res.send(result);
  });

  //update course Details
  app.put(`${baseUrl}/details-update`, async (req, res) => {
    const result = await service.UpdateCourseDetails(req.body, res);
    res.send(result);
  });

  //get course with filters
  app.get(`${baseUrl}/filters`, async (req, res) => {
    const result = await service.GetCourseFilters(req.query);
    res.send(result.length > 0 ? result : "No courses found");
  });

  //delete course
  app.delete(`${baseUrl}/delete`, async (req, res) => {
    const result = await service.DeleteCourse(req.body, res);
    res.send(result);
  });

  // Route to handle file upload
  app.post(`${baseUrl}/upload`, upload.single("image"), async (req, res) => {
    //req body with image file path
    const body = {
      ...req.body,
      image: req.file.filename,
    };
    const result = await service.CreateCourse(body, res);
    res.send(result);
  });
};
