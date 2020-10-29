const jwt = require('jsonwebtoken');

const SECRET = 'trybe2020';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, headers);

  return token;
}

module.exports = createToken;
