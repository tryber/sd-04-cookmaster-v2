const jwt = require('jsonwebtoken');

const { secret } = require('./createToken');

const validateToken = (token) => jwt.verify(token, secret);

module.exports = validateToken;
