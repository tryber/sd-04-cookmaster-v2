const jwt = require('jsonwebtoken');

const { secret } = require('./createToken');

const validateToken = (token) => {
  return jwt.verify(token, secret); 
};

module.exports = validateToken;
