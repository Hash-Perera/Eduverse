const User = require("../schema/user.schema");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { PublishMessage } = require("../utils/index.utils");
const axios = require("axios");

class AuthService {
  //?This is the remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "REGISTER_TEST":
        //this.RegisterTest(payload);
        break;
      default:
        break;
    }
  }

  //TODO: Implement other service functions here ---------------------------------

  //!--> Register function
  async Register(payload, res) {
    const encryptedPassword = await argon2.hash(payload.data.password);
    payload.data.password = encryptedPassword;
    const newUser = await User.create(payload.data);
    res.status(200).send({
      success: true,
      data: newUser,
      message: "User registered successfully",
    });
  }

  //!--> Login function
  async Login(payload, res) {
    const data = payload.data;
    const isExist = await User.findOne({ email: data.email });
    if (!isExist) {
      return res
        .status(403)
        .json({ success: false, message: "User not found. Please try again." });
    }
    const user = await User.findOne({ email: data.email }).populate("role");

    if (!(await argon2.verify(user.password, data.password))) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect. Please try again.",
      });
    }

    //? generate jwt token
    const jwt_payload = jwt.sign(
      { id: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    //? send token
    res.status(200).json({
      success: true,
      data: { token: jwt_payload, role: user.role.name },
      message: "Login successfull",
    });
  }

  //! Validate user function
  async Validate(id, res) {
    const user = await User.findById(id).populate("role");
    const returnObject = {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      role: user.role.name,
    };

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found. Please try again." });
    }
    res
      .status(200)
      .json({ success: true, data: returnObject, message: "User is valid" });
  }

  async GetDetails(id, res) {
    const user = await User.findById(id);
    user.password = "**********";
    res.status(200).json({
      success: true,
      data: user,
      message: "User details fetched successfully",
    });
  }

  async Update(id, data, res) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      success: true,
      data: user,
      message: "User updated successfully",
    });
  }

  async sendOtpToNotificationService(req, userId, res) {
    const token = req.headers.authorization;
    console.log(token);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await User.findByIdAndUpdate(
      userId,
      { otp: otp },
      { new: true }
    );
    if (user) {
      axios.post(
        "http://localhost:8000/ms-notification/notification/send-otp",
        {
          userId: userId,
          otp: otp,
          email: user.email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "OTP sent successfully",
    });
  }

  async ResetPassword(req, userId, data, res) {
    const user = await User.findById(userId);

    if (data.otp == user.otp) {
      const encryptedPassword = await argon2.hash(data.newPassword);
      const updatedUser = await User.findByIdAndUpdate(userId, {
        password: encryptedPassword,
      });

      const dashboardNotification = {
        title: "Password reset",
        message: "Password reset successfully",
        data: {},
        viewed: false,
        userId: userId,
      };

      axios
        .post(
          "http://localhost:8000/ms-notification/notification/create-dashboard",
          dashboardNotification,
          {
            headers: {
              Authorization: req.headers.authorization,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });

      return res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Password updated successfully",
      });
    }
    return res.status(403).json({
      success: false,
      message: "OTP is incorrect. Please try again.",
    });
  }

  //! =======  DO not Delete this function =========
  async RegisterTest(req, res, channel) {
    console.log("Register test");
    PublishMessage(channel, "Course", JSON.stringify({ event: "GET_COURSES" }));
  }
}

module.exports = AuthService;
