const errorsMessages = require('./errorsMessagens');
const createToken = require('./auth/createToken');
const validateToken = require('./auth/validateToken');

module.exports = {
  errorsMessages,
  createToken,
  validateToken,
};
