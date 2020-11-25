const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: payload }, secret, headers);

  return token;
}

module.exports = { createToken };
