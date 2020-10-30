const User = require('../models/User');
const validation = require('../utils/validation');

// const ENTRIES_MESSAGE = 'Invalid entries. Try again.';
// const EMAIL_EXISTS_MESSAGE = 'Email already registered';

const errorMessageValidation = (message) => ({ message });

const inserNewUser = async ({ name, email, password, role = 'user' }) => {
  if (validation.isFieldsInvalid(name, email, password)) {
    return errorMessageValidation(validation.ENTRIES_MESSAGE);
  }

  if (await User.findByEmail(email)) {
    return errorMessageValidation(validation.EMAIL_EXISTS_MESSAGE);
  }

  const insertResponse = await User.insertNewUser({ name, email, password, role });
  return insertResponse;
};

const loginOperation = async ({ email, password }) => {
  if (validation.isLoginInvalid(email, password)) {
    return errorMessageValidation(validation.ALL_FIELDS_MESSAGE);
  }
  if (validation.isEmailInvalid(email)) {
    return errorMessageValidation(validation.EMAIL_OR_PASS_INVALID);
  }
  if (!await User.findPassword(password)) {
    return errorMessageValidation(validation.EMAIL_OR_PASS_INVALID);
  }
};

module.exports = {
  inserNewUser,
  loginOperation,
};
