const rescue = require('express-rescue');
const { userValidation, loginValidation } = require('../models/usersModel');

const validateUser = rescue(async (req, _res, next) => {
  await userValidation(req.body);
  next();
});

const validateLogin = rescue(async (req, _res, next) => {
  const userInfo = await loginValidation(req.body);
  const { password: _, _id: id, ...userWithoutPass } = userInfo;
  req.user = { ...userWithoutPass, id };
  next();
});

module.exports = { validateUser, validateLogin };
