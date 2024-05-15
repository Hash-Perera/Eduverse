const Lesson = require("../schema/Lessons.schema");
const Course = require("../schema/course.schema");

class LessonService {
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "CREATE_LESSON":
        this.CreateCourseTest(payload);
        break;
      case "GET_LESSONS":
        this.R_getCourses();
        break;
      default:
        break;
    }
  }

  //Create lessons
  async CreateLesson(payload, res) {
    try {
      const newLesson = await Lesson.create(payload);
      const course = await Course.findById(payload.course);

      if (!course) {
        res.status(404).send({
          success: false,
          data: null,
          message: "Course not found",
        });
      }

      course.lessons.push(newLesson._id);

      await course.save();

      res.status(200).send({
        success: true,
        data: newLesson,
        message: "Lesson created successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //delete lesson
  async DeleteLesson(payload, res) {
    try {
      const lesson = await Lesson.findByIdAndDelete(payload.lessonId);

      if (!lesson) {
        return res.status(404).send({
          success: false,
          message: "Lesson not found",
        });
      }

      const courseId = lesson.course;
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).send({
          success: false,
          message: "Course not found",
        });
      }

      course.lessons = course.lessons.filter(
        (id) => id.toString() !== lesson._id.toString()
      );

      await course.save();

      res.status(200).send({
        success: true,
        data: lesson,
        message: "Lesson deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //update lesson
  async UpdateLesson(payload, res) {
    try {
      const lesson = await Lesson.findByIdAndUpdate(payload.lessonId, payload, {
        new: true,
      });

      if (!lesson) {
        return res.status(404).send({
          success: false,
          message: "Lesson not found",
        });
      }

      res.status(200).send({
        success: true,
        data: lesson,
        message: "Lesson updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LessonService;
