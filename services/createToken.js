const jwt = require('jsonwebtoken');

const secret = 'segredo';

const createToken = (payload) => {
  const headers = { expiresIn: '7d', algorithm: 'HS256' };
  return jwt.sign(payload, secret, headers);
};

module.exports = { createToken };
