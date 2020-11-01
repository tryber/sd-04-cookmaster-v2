const User = require('../models/User');
const validation = require('../utils/validation');
const jwtConfig = require('../utils/configs');
const jwt = require('jsonwebtoken');

const insertNewUser = async ({ name, email, password, role = 'user' }) => {
  if (validation.isFieldsInvalid(name, email, password) || validation.isEmailInvalid(email)) {
    return validation.errMessage(validation.ENTRIES_MESSAGE);
  }

  if (await User.findByEmail(email)) {
    return validation.errMessage(validation.EMAIL_EXISTS_MESSAGE);
  }

  const insertResponse = await User.insertNewUser({ name, email, password, role });
  return insertResponse;
};

const loginOperation = async ({ email, password }) => {
  if (validation.isLoginInvalid(email, password)) {
    return validation.errMessage(validation.ALL_FIELDS_MESSAGE);
  }
  if (validation.isEmailInvalid(email)) {
    return validation.errMessage(validation.EMAIL_OR_PASS_INVALID);
  }
  if (!await User.findPassword(password)) {
    return validation.errMessage(validation.EMAIL_OR_PASS_INVALID);
  }
};

const searchUserAndGenerateToken = async (email) => {
  const userInfo = await User.findUserByEmail(email);
  const token = jwt.sign({ data: userInfo }, jwtConfig.SECRET, jwtConfig.JWT_CONFIG);
  return token;
};

module.exports = {
  insertNewUser,
  loginOperation,
  searchUserAndGenerateToken,
};
