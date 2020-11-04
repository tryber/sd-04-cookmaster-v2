require('dotenv').config();

module.exports = {
  emailValid: /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i,
  secret: 'secretOrNot',
  PORT: process.env.PORT,
  URL_MONGO: process.env.MONGO_DB_URL,
  DB_NAME: process.env.DB_NAME,
  HTTPStatus: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    INTERN_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
  },
};
