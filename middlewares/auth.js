const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const userModel = require('../models/userModel');

const secret = 'cookmaster-v2';

const auth = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(Boom.unauthorized('missing auth token'));
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { email } = decoded;

    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return next(Boom.badRequest('User does not exists.'));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(Boom.unauthorized('jwt malformed'));
  }
};

module.exports = auth;
