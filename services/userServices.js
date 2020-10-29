const User = require('../models/User');

const ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const EMAIL_EXISTS_MESSAGE = 'Email already registered';

const errorMessageValidation = (message) => ({ message });

const isFieldsInvalid = (name, email, password) => {
  const emailTest = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!name || !email || !password || !emailTest.test(email)) {
    return true;
  }

  // if (!emailTest.test(email)) {
  //   return true;
  // }
};

const inserNewUser = async ({ name, email, password, role = 'user' }) => {
  if (isFieldsInvalid(name, email, password)) {
    return errorMessageValidation(ENTRIES_MESSAGE);
  }

  if (await User.findByEmail(email)) {
    return errorMessageValidation(EMAIL_EXISTS_MESSAGE);
  }

  const insertResponse = await User.insertNewUser({ name, email, password, role });
  return insertResponse;
};

module.exports = {
  inserNewUser,
};
