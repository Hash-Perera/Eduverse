const LessonService = require("../services/lesson.service");
/* const { SubscribeMessages } = require("../utils/index.utils"); */
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../../frontend/public/pdf/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Example: limit to 50 MB
});

module.exports = (app) => {
  const service = new LessonService();
  const baseUrl = "/lesson";

  /*   //To listen
  SubscribeMessages(channel, service); */

  //Create lesson
  app.post(`${baseUrl}/create`, upload.single("notes"), async (req, res) => {
    console.log(req.body);
    try {
      const body = {
        ...req.body,
        notes: req.file.filename,
      };
      const result = await service.CreateLesson(body, res);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  //delete lesson
  app.delete(`${baseUrl}/delete/:lessonId`, async (req, res) => {
    const result = await service.DeleteLesson(req.params, res);
    res.send(result);
  });

  //update lesson
  app.put(`${baseUrl}/update`, async (req, res) => {
    const result = await service.UpdateLesson(req.body, res);
    res.send(result);
  });
};
