const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const validateToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = validateToken;
