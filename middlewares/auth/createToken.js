const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

// secret deve ser colocado no .env, mas para o avaliador rodar colocado aqui.
const secret = require('./secret');

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = {
  createToken,
};
