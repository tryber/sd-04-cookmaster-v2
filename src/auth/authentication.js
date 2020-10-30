const usersModel = require('../models/userModel');
const { ERR_USER_NOT_FOUND, ERR_INVALID_PASSWORD } = require('../utils/errorTypes');
const Token = require('./token');

/* eslint-disable no-param-reassign, no-underscore-dangle */

const login = async (email, password) => {
  const user = await usersModel.findUserByEmail(email);

  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND);
  }

  if (password !== user.password) {
    throw new Error(ERR_INVALID_PASSWORD);
  }

  const token = await Token.generate({
    userId: user._id,
    userEmail: user.email,
    userRole: user.role,
  });

  return token;
};

module.exports = {
  login,
};
