const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = 'tardezinha';

const signToken = (payload) => jwt.sign(payload, secret, headers);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { signToken, verifyToken };
