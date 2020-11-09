const JWT = require('jsonwebtoken');

const secret = require('./secret');

const validateToken = (token) => {
  const payload = JWT.verify(token, secret);

  return payload;
};

module.exports = {
  validateToken,
};
