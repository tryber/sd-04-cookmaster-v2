require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  URL_MONGO: process.env.MONGO_DB_URL,
  DB_NAME: process.env.DB_NAME,
  HTTPStatus: {
    OK: 200,
    CREATED: 201,
    INTERN_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
  },
};
