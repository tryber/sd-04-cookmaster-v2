const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { usersModel } = require('../models');

const JWT_SECRET = 'h1h1h1h1';

module.exports = (required = true) => async (req, _res, next) => {
  const token = req.headers.authorization;

  switch (true) {
    case !required:
      return next();
    case required && !token:
      return next(boom.unauthorized('missing auth token'));
    default:
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await usersModel.userEmail(payload.email);

    req.user = user;
    next();
  } catch (err) {
    return next(boom.unauthorized('jwt malformed'));
  }
};
