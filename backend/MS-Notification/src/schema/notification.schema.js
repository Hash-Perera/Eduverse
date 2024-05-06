const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  data: {
    type: Object,
    required: false,
  },

  viewed: {
    type: Boolean,
    required: true,
    default: false,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
