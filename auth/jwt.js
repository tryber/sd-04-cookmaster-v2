const JWT = require('jsonwebtoken');

const secret = 'the secret is a lie';

const createToken = (payload) => {
  const options = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  return JWT.sign(payload, secret, options);
};

const verifyToken = (token) => JWT.verify(token, secret);

module.exports = { createToken, verifyToken };
