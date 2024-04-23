const User = require("../schema/user.schema");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class AuthService {
  //?This is the remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "REGISTER":
        this.RegisterTest(payload);
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

  async RegisterTest(payload) {
    console.log(payload.data);
    console.log("Register test");
  }

  //!--> Login function
  async Login(payload, res) {
    const data = payload.data;
    const user = await User.findOne({ email: data.email }).populate("role");
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found. Please try again." });
    }
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
      data: { token: jwt_payload },
      message: "Login successfull",
    });
  }
}

module.exports = AuthService;
