const Role = require("../schema/role.model");

class RoleService {
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "ROLE":
        this.RoleTest(payload);
        break;
      default:
        break;
    }
  }

  async CreateRole(payload, res) {
    const newRole = await Role.create(payload.data);
    res.status(200).send({
      success: true,
      data: newRole,
      message: "Role created successfully",
    });
  }

  async RoleTest(payload) {
    console.log(payload.data);
    console.log("Role test");
  }
}

module.exports = RoleService;
