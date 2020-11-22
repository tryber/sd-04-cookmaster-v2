const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = '2c85c7d5da3941bffefd6920fa029112';

const createToken = (payload) => jwt.sign(payload, secret, headers);

module.exports = createToken;
