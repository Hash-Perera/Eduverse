const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Course", courseSchema);
