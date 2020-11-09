const JWT = require('jsonwebtoken');

const header = {
  expiresIn: '180m',
  algorithm: 'HS256',
};

// echo -n leo | md5sum

const secret = require('./secret');

const createToken = (payload) => {
  const token = JWT.sign(payload, secret, header);
  return token;
};

module.exports = {
  createToken,
};
