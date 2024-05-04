const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");

//? Load env variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const AuthMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  //! Checking token
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  axios
    .post("http://localhost:8000/ms-auth/user/validate", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      req.user = response.data.data;
      next();
    })
    .catch((error) => {
      return res
        .status(403)
        .json({ success: false, message: "Error !!! Unauthorized" });
    });
};

module.exports = AuthMiddleware;
