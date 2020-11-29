const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = process.env.SECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = { createToken };
