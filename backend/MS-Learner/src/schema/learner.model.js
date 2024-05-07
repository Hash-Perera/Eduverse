const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,
      required: true,
    },
    enrolledCourses: [
      {
        courseId: {
          type: String,
         
        },
        progress: {
          type: Number,
          required: false,
          default: 0,
        },
        enrolledOn: {
          type: Date,
          required: false,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Learner = mongoose.model("learner", learnerSchema);

module.exports = Learner;
