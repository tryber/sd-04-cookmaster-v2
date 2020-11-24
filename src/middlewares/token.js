const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = { createToken };
