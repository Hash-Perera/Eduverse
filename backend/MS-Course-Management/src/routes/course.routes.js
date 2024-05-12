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
  app.put(`${baseUrl}/status-update`, async (req, res) => {
    try {
      const result = await service.UpdateCourseStatus(req.body, res);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  app.get(`${baseUrl}/get-by-id/:id`, async (req, res) => {
    const result = await service.GetCourseById(req.params, res);
    res.send(result);
  });

  //update course Details
  app.put(
    `${baseUrl}/details-update`,
    upload.single("image"),
    async (req, res) => {
      try {
        const body = {
          ...req.body,
          image: req.file.filename,
        };
        const result = await service.UpdateCourseDetails(body, res);
        res.send(result);
      } catch (err) {
        console.log(err);
      }
    }
  );

  //get course with filters
  app.get(`${baseUrl}/filters`, async (req, res) => {
    const result = await service.GetCourseFilters(req.query);
    res.send(result.length > 0 ? result : "No courses found");
  });

  //delete course
  app.delete(`${baseUrl}/delete/:id`, async (req, res) => {
    try {
      const result = await service.DeleteCourse(req.params, res);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  // Route to handle file upload
  app.post(`${baseUrl}/upload`, upload.single("image"), async (req, res) => {
    try {
      const body = {
        ...req.body,
        instructor: req.user.id,
        image: req.file.filename,
      };
      const result = await service.CreateCourse(body, res);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  //getInstructorCourses
  app.get(`${baseUrl}/instructor-courses`, async (req, res) => {
    try {
      const body = {
        ...req.query,
        instructor: req.user.id,
      };
      const result = await service.GetInstructorCourses(body);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });
};
