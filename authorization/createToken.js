const jwt = require('jsonwebtoken');
const secret = require('./secret');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const creatToken = (payload) => {
  // headres
  // payload
  // secret
  const token = jwt.sign(payload, secret, headers);
  return token;
};

module.exports = creatToken;
