const jwt = require('jsonwebtoken');
const errorsMessagens = require('../errorsMessagens');
const { secret } = require('../../config');

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!token || !data) {
      return errorsMessagens(res, 'token invalid', 'invalid_data');
    }
    next();
  } catch (err) {
    console.error('validateToken', err);
    return errorsMessagens(res);
  }
};

module.exports = validateToken;
