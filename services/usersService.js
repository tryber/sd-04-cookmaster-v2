// JWT https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');
const { usersModel } = require('../models');

const SECRET = 'mysecret';
// padrão HS256
// expira em 60 seg
const JWT = {
  expiresIn: '60',
  algorithm: 'HS256',
};

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

const login = async ({ email: userEmail, password }) => {
  const { _id, role, email, password: userPassword } = await usersModel.userEmail(userEmail);

  if (password !== userPassword) {
    return;
  }

  const notPassword = { _id, role, email };
  const token = jwt.sign(notPassword, SECRET, JWT);

  return token;
};

module.exports = {
  createUser,
  createAdmin,
  login,
};
