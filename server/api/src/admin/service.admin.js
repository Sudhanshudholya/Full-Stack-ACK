const Admin = require("./model.admin");

const adminService = {};

adminService.adminCreate = async ({ username, password }) => {
  return await Admin.create({ username, password });
};
adminService.getAdminByUserNameAndPassword = async ({ username }) => {
  return await Admin.find({ username });
};
module.exports = adminService;
