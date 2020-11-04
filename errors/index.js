const INVALID_ENTRIES = { message: 'Invalid entries. Try again.', code: 400 };
const EMAIL_REGISTERED = { message: 'Email already registered', code: 409 };
const MISSING_FIELDS = { message: 'All fields must be filled', code: 401 };
const LOGIN_ERROR = { message: 'Incorrect username or password', code: 401 };
const JWT_MALFORMED = { message: 'jwt malformed', code: 401 };
const RECIPE_NOT_FOUND = { message: 'recipe not found', code: 404 };
const MISSING_TOKEN = { message: 'missing auth token', code: 401 };
const NOT_AUTHORIZED = { message: 'user not authorized', code: 401 };
const ONLY_ADMINS = { message: 'Only admins can register new admins', code: 403 };

module.exports = {
  INVALID_ENTRIES,
  EMAIL_REGISTERED,
  LOGIN_ERROR,
  MISSING_FIELDS,
  JWT_MALFORMED,
  RECIPE_NOT_FOUND,
  MISSING_TOKEN,
  NOT_AUTHORIZED,
  ONLY_ADMINS,
};
