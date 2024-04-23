const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token! didn't match" });
    }

    req.user = user;
    next();
  });
};

module.exports = AuthMiddleware;
