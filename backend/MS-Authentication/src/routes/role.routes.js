const RoleService = require("../services/role.service");
//const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {
  const service = new RoleService();
  const baseurl = "/role";

  //To listen
  //SubscribeMessages(channel, service);

  //Other routes
  app.post(`${baseurl}/create`, async (req, res) => {
    const result = await service.CreateRole(req.body, res);
    res.send(result);
  });
};
