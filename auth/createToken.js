const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = process.env.SECRET;
// const secret = 'testando uma parada aqui';
console.log(secret);

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = { createToken };
