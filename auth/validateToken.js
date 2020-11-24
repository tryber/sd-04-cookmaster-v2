const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = (token) => jwt.verify(token, secret);

module.exports = validateToken;
