const usersModel = require('../models/usersModel');
const { ERR_USER_NOT_FOUND, ERR_INVALID_PASSWORD } = require('../utils/errorTypes');
const Token = require('./token');

const login = async (email, password) => {
  const user = await usersModel.findUserByEmail(email);

  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND);
  }

  if (password !== user.password) {
    throw new Error(ERR_INVALID_PASSWORD);
  }

  const token = await Token.generate({
    userId: user.id,
    userEmail: user.email,
    userRole: user.role,
  });

  return token;
};

module.exports = {
  login,
};
