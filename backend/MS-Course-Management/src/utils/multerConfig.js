const multer = require("multer");

// Multer configuration for file upload
const storage = multer.diskStorage({
  //destination should be frontend/public/images

  destination: function (req, file, cb) {
    cb(null, "./../../frontend/public/images/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Use the original file name as the saved file name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
