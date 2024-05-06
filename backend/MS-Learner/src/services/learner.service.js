const Learner = require("../schema/learner.model");
const axios = require("axios");

class LearnerService {
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "ENROLL_COURSE":
        break;
      default:
        break;
    }
  }

  //enroll course
  async enrollCourse(payload, res) {
    try {
      const learner = await Learner.findOne({
        student_id: payload.student_id,
      });

      // If learner is not found, create a new learner and enroll the course
      if (!learner) {
        const newLearner = await Learner.create(payload);

        const responseLearner = {
          student_id: newLearner.student_id,
          enrolledCourses: newLearner.enrolledCourses,
          // Add other properties you need
        };
        return {
          success: true,
          data: responseLearner,
          message: "Course enrolled successfully",
        };
      }

      // If learner is found, merge the new course IDs with existing ones
      const newCourseIds = payload.enrolledCourses.map(
        (course) => course.courseId
      );
      const existingCourseIds = learner.enrolledCourses.map(
        (course) => course.courseId
      );
      const mergedCourseIds = [...existingCourseIds, ...newCourseIds];

      // Remove duplicate course IDs
      const uniqueCourseIds = [...new Set(mergedCourseIds)];

      // Update the enrolledCourses array with unique course IDs
      learner.enrolledCourses = uniqueCourseIds.map((courseId) => ({
        courseId,
      }));

      // Save the updated learner
      const updatedLearner = await learner.save();

      return {
        success: true,
        data: updatedLearner,
        message: "Course enrolled successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  //get enrolled courses
  async getEnrolledCourses(payload, res) {
    const learner = await Learner.findOne({
      student_id: payload.student_id,
    });
    if (!learner) {
      return {
        message: "No courses enrolled",
      };
    }

    return {
      data: learner.enrolledCourses,
      message: "Courses fetched successfully",
    };
  }

  //get enrolled course by course id
  async getEnrolledCourseById(payload, res) {
    try {
      const learner = await Learner.findOne({
        student_id: payload.student_id,
      });
      if (!learner) {
        return {
          message: "No courses enrolled",
        };
      }

      const course = learner.enrolledCourses.find(
        (course) => course.courseId === payload.courseId
      );
      if (!course) {
        return {
          message: "Course not enrolled",
        };
      }

      axios
        .get(
          "http://localhost:8000/ms-course/course/get-by-id" + payload.courseId
        )
        .then((response) => {
          if (response.data.success === false) {
            return res.status(403).json({
              message: "Course not found",
            });
          }
        });

      const coursedetails = response.data;

      const response = {
        courseId: course.courseId,
        enrolledOn: course.enrolledOn,
        progress: course.progress,
      };

      return {
        success: true,
        data: response,
        coursedetails,
        message: "Course fetched successfully",
      };
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  //get course progress
  async getCourseProgress(payload, res) {
    const learner = await Learner.findOne({
      student_id: payload.data.student_id,
    });
    if (!learner) {
      return res.status(403).json({
        message: "No courses enrolled",
      });
    }

    const course = learner.enrolledCourses.find(
      (course) => course.courseId === params.courseId
    );
    if (!course) {
      return res.status(403).json({
        message: "Course not enrolled",
      });
    }

    return res.status(200).send({
      data: course.progress,
      message: "Course progress fetched successfully",
    });
  }
  //update course progress
  async updateCourseProgress(payload, res) {
    const learner = await Learner.findOne({
      student_id: payload.student_id,
    });
    if (!learner) {
      return res.status(403).json({
        message: "No courses enrolled",
      });
    }

    const courseIndex = learner.enrolledCourses.findIndex(
      (course) => course.courseId === payload.courseId
    );
    if (courseIndex === -1) {
      return res.status(403).json({
        message: "Course not enrolled",
      });
    }

    // Update the progress of the course
    learner.enrolledCourses[courseIndex].progress = payload.progress;

    try {
      await learner.save();
      return {
        data: learner.enrolledCourses[courseIndex],
        message: "Course progress updated successfully",
      };
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating course progress",
      });
    }
  }

  //delete enrolled course
  async deleteEnrolledCourse(payload, res) {
    const learner = await Learner.findOne({
      student_id: payload.student_id,
    });
    if (!learner) {
      return res.status(403).json({
        message: "No courses enrolled",
      });
    }

    const courseIndex = learner.enrolledCourses.findIndex(
      (course) => course.courseId === payload.courseId
    );
    if (courseIndex === -1) {
      return res.status(403).json({
        message: "Course not enrolled",
      });
    }
    // Remove the course from the enrolled courses
    learner.enrolledCourses.splice(courseIndex, 1);

    try {
      await learner.save();
      return {
        data: learner.enrolledCourses,
        message: "Course unenrolled successfully",
      };
    } catch (error) {
      return res.status(500).json({
        message: "Error unenrolling course",
      });
    }
  }
}

module.exports = LearnerService;