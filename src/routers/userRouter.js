const { Router } = require('express');
const { usersController } = require('../controllers');
const validations = require('../middlewares');
// const {} = require('../service');

const userRouter = Router();

userRouter.post(
  '/',
  validations.validCreateUser,
  validations.emailValidator,
  usersController.createUserController,
);

module.exports = userRouter;
