const { usersModel } = require('../models');

const createUser = async (user) => {
  const testUser = await usersModel.userEmail(user.email);
  if (testUser) {
    return;
  }
  const userOk = await usersModel.createUser(user);
  return userOk;
};

const createAdmin = async (admin) => {
  const testAdmin = await usersModel.userEmail(admin.email);
  if (testAdmin) {
    return;
  }
  const adminOk = await usersModel.createAdmin(admin);
  return adminOk;
};

module.exports = {
  createUser,
  createAdmin,
};
