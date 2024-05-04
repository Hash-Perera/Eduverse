// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { CreateChannel } = require("./utils/index.utils");

// //! Initialize Express app
// const app = express();

// //! Middleware
// app.use(cors());
// app.use(bodyParser.json());
// //AuthMiddleware
// //Routemiddleware

// async () => {
//   const channel = await CreateChannel();
// };

// //!Routes

// module.exports = app;

const express = require("express");
const cors = require("cors");
const { AuthGuard } = require("../src/middlewares/auth-guard");
const AuthRoute = require("../src/routes/auth.routes");
const RoleRoute = require("../src/routes/role.routes");
module.exports = async (app, channel) => {
  app.use(express.json());
  app.use(cors());

  app.use(AuthGuard);

  AuthRoute(app, channel);
  RoleRoute(app, channel);
};
