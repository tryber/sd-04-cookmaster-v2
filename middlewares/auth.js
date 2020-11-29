const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const secret = 'umsegredo';

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, secret, headers);
  return token;
};

module.exports = {
  createToken,
};
