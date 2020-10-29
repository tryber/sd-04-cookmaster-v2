const jwt = require('jsonwebtoken');
const errorsMessagens = require('../errorsMessagens');
const { secret } = require('../../config');

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return errorsMessagens(res, 'missing auth token', 'unauthorized');
    }

    const data = jwt.verify(token, secret);

    const { iat, exp, ...userData } = data;
    req.user = userData;

    next();
  } catch (err) {
    console.error('validateToken', err.message);
    return errorsMessagens(res, 'jwt malformed', 'unauthorized');
  }
};

module.exports = validateToken;
