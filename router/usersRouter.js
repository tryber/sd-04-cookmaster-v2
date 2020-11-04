const express = require('express');

const userValidations = require('../middlewares/userValidations');
const controllers = require('../controllers');

const usersRouter = express.Router();

usersRouter.post(
  '/',
  userValidations.registerRequiredFields,
  userValidations.isValidEmail,
  userValidations.validateUserExistsByEmail,
  controllers.userController.registerUser
);

module.exports = usersRouter;
