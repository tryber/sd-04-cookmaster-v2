const jwt = require('jsonwebtoken');

const secret = 'cookmasterv2';

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = { createToken };
