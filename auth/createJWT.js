const jwt = require('jsonwebtoken');

const secret = 'Cookmaster2';

const createToken = (payload) => {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  // criando o Token
  const toker = jwt.sign(payload, secret, headers);
  return toker;
};

module.exports = createToken;
