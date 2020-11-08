const rescue = require('express-rescue');
const verifyUserAuth = require('../services/verifyUserAuth');

const validateUserAuth = rescue(async (req, _res, next) => {
  const { params: { id }, user } = req;
  await verifyUserAuth(id, user);
  next();
});

module.exports = validateUserAuth;
