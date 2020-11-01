const emailTest = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

// Messages
const ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const EMAIL_EXISTS_MESSAGE = 'Email already registered';
const ALL_FIELDS_MESSAGE = 'All fields must be filled';
const EMAIL_OR_PASS_INVALID = 'Incorrect username or password';
const INVALID_TOKEN = 'jwt malformed';
const RECIPE_NOT_FOUND = 'recipe not found';

// Services validation
const errMessage = (message) => ({ message });

const isEmailInvalid = (email) => !emailTest.test(email);

const isFieldsInvalid = (name, emailIng, passwordPrep) => (!name || !emailIng || !passwordPrep);

const isLoginInvalid = (email, password) => (!email || !password);

// Controllers validation
const isError = (object, text) => object && object.includes(text);

module.exports = {
  ENTRIES_MESSAGE,
  EMAIL_EXISTS_MESSAGE,
  ALL_FIELDS_MESSAGE,
  EMAIL_OR_PASS_INVALID,
  INVALID_TOKEN,
  RECIPE_NOT_FOUND,
  errMessage,
  isEmailInvalid,
  isFieldsInvalid,
  isLoginInvalid,
  isError,
};
