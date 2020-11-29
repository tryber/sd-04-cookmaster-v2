const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = "fiz errado antes, triste";

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = { createToken };
