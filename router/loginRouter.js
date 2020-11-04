const express = require('express');

const userValidations = require('../middlewares/userValidations');
const controllers = require('../controllers');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  userValidations.loginRequiredFields,
  userValidations.validateLogin,
  controllers.userController.loginUser,
);

module.exports = loginRouter;
