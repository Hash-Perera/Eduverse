const Course = require("../schema/course.schema");

class CourseService {
  //? This is remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "CREATE_COURSE":
        this.CreateCourse(payload);
        break;
      case "GET_COURSES":
        this.R_getCourses();
        break;
      default:
        break;
    }
  }

  //TODO: Implement other service functions here ---------------------------------
  /* async CreateCourseTest(payload) {
    console.log("Create course test");
    console.log(payload.data);
  } */

  // Create course
  async CreateCourse(payload, res) {
    try {
      const newCourse = await Course.create(payload);
      res.status(200).send({
        success: true,
        data: newCourse,
        message: "Course created successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //course filter with params category and status
  async GetCourseFilters(payload) {
    try {
      if (payload.category === "all") {
        const courses = await Course.find({ status: payload.status })
          .populate({
            path: "lessons",
            model: "Lesson",
          })
          .exec();

        return courses;
      } else {
        const courses = await Course.find({
          category: payload.category,
          status: payload.status,
        })
          .populate({
            path: "lessons",
            model: "Lesson",
          })
          .exec();

        return courses;
      }
    } catch (err) {
      console.log(err);
    }
  }

  //get course by id
  async GetCourseById(payload) {
    try {
      const course = await Course.findById({ _id: payload.id })
        .populate({
          path: "lessons",
          model: "Lesson",
        })
        .exec();

      if (!course) {
        return res.status(404).send({
          success: false,
          message: "Course not found",
        });
      }
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  //update course status
  async UpdateCourseStatus(payload, res) {
    try {
      const course = await Course.findOneAndUpdate(
        { _id: payload.id },
        { status: payload.status },
        { new: true }
      );

      if (!course) {
        return res.status(404).send({
          success: false,
          message: "Course not found",
        });
      }
      res.status(200).send({
        success: true,
        data: course,
        message: "Course Status Updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //update course details
  async UpdateCourseDetails(payload, res) {
    const course = await Course.findOneAndUpdate(
      { _id: payload.id },
      {
        name: payload.name,
        price: payload.price,
        duration: payload.duration,
        description: payload.description,
        instructor: payload.instructor,
        image: payload.image,
        category: payload.category,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      data: course,
      message: "Course Updated successfully",
    });
  }

  //delete course
  async DeleteCourse(payload, res) {
    try {
      const course = await Course.findByIdAndDelete(payload.id);

      if (!course) {
        return res.status(404).send({
          success: false,
          message: "Course not found",
        });
      }

      res.status(200).send({
        success: true,
        data: course,
        message: "Course deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  //get courses for specified instructor
  async GetInstructorCourses(payload) {
    try {
      if (payload.body.instructor) {
        if (payload.query.category === "all") {
          const courses = await Course.find({
            instructor: payload.body.instructor,
            status: payload.query.status,
          })
            .populate({
              path: "lessons",
              model: "Lesson",
            })
            .exec();

          return courses;
        } else {
          const courses = await Course.find({
            instructor: payload.body.instructor,
            category: payload.query.category,
            status: payload.query.status,
          })
            .populate({
              path: "lessons",
              model: "Lesson",
            })
            .exec();

          return courses;
        }
      } else {
        if (payload.query.category === "all") {
          const courses = await Course.find({ status: payload.query.status })
            .populate({
              path: "lessons",
              model: "Lesson",
            })
            .exec();

          return courses;
        } else {
          const courses = await Course.find({
            category: payload.query.category,
            status: payload.query.status,
          })
            .populate({
              path: "lessons",
              model: "Lesson",
            })
            .exec();

          return courses;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  //! =======  DO not Delete this function =========
  async R_getCourses() {
    console.log("Get courses list");
    return [
      {
        name: "Course 1",
        price: "100",
      },
      {
        name: "Course 2",
        price: "200",
      },
    ];
  }
}

module.exports = CourseService;
