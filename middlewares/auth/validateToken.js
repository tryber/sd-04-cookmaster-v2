const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = (token) => {
  const payload = jwt.verify(token, secret);

  console.log(payload);
  return payload;
};

module.exports = validateToken;
