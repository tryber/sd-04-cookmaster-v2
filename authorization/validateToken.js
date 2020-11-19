const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = (token) => {
  const key = jwt.verify(token, secret);
  return key;
};

module.exports = validateToken;
