const jwt = require('jsonwebtoken');

const secret = 'segredo que deveria estar em uma variavel de ambiente';
const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = createToken;
