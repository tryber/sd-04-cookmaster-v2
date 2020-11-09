const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  // console.log(token);

  return token;
}

module.exports = createToken;
