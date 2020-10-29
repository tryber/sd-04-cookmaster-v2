const rescue = require('express-rescue');
const { userValidation: user, loginValidation: login } = require('../models/usersModel');

const validateTypes = { user, login };

const validate = (type) => rescue(async ({ body }, _res, next) => {
  const error = await validateTypes[type](body);
  if (error) throw error;
  next();
});

module.exports = validate;
