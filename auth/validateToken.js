const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const validateToken = (token) => jwt.verify(token, secret);

module.exports = validateToken;
