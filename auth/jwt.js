const JWT = require('jsonwebtoken');

const secret = 'the secret is a lie';

const createToken = (data) => {
  const options = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  return JWT.sign({ data }, secret, options);
};

const verifyToken = (token) => JWT.verify(token, secret, (err, decoded) => (err ? null : decoded));

module.exports = { createToken, verifyToken };
