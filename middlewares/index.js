const loginVal = require('./loginValidation');
const login = require('./login');
const { createUser } = require('./users');
const createUserVal = require('./usersValidation');

module.exports = {
  loginVal,
  login,
  createUserVal,
  createUser,
};
