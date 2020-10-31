const emailTest = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const EMAIL_EXISTS_MESSAGE = 'Email already registered';
const ALL_FIELDS_MESSAGE = 'All fields must be filled';
const EMAIL_OR_PASS_INVALID = 'Incorrect username or password';

const JWT_CONFIG = {
  expiresIn: '1m',
  algorithm: 'HS256',
};

const isEmailInvalid = (email) => !emailTest.test(email);

const isFieldsInvalid = (name, email, password) => {
  if (!name || !email || !password || isEmailInvalid(email)) {
    return true;
  }
};

const isLoginInvalid = (email, password) => {
  if (!email || !password) {
    return true;
  }
};

module.exports = {
  ENTRIES_MESSAGE,
  EMAIL_EXISTS_MESSAGE,
  ALL_FIELDS_MESSAGE,
  EMAIL_OR_PASS_INVALID,
  JWT_CONFIG,
  isEmailInvalid,
  isFieldsInvalid,
  isLoginInvalid,
};
