const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");

const AuthGuard = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  //! Allow login endpoint without token
  if (
    req.path === "/user/login" ||
    req.path === "/user/register" ||
    req.path === "/user/send-otp-logout" ||
    req.path === "/user/reset-password/with-body"
  ) {
    return next();
  }
  if (req.path === "/user/validate") {
  }

  console.log(token);
  //! Checking token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token! didn't match" });
    }

    const findUser = await User.findById(user.id).select("-password");

    if (!findUser) {
      return res
        .status(403)
        .json({ message: "Invalid token! cannot find user" });
    }
    req.user = findUser._id;
    next();
  });
};

module.exports = { AuthGuard };
