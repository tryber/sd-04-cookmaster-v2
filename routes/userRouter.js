const { Router } = require('express');
const { userController: { createUserController } } = require('../controllers');
const { userMiddlewares:
  { validateName, validateEmail, validatePassword },
} = require('../middlewares');
const { INVALID_ENTRIES } = require('../utils/errorTypes');

const userRouter = Router();

userRouter.post('/',
  validateName(400, INVALID_ENTRIES),
  validateEmail(400, INVALID_ENTRIES),
  validatePassword(400, INVALID_ENTRIES),
  createUserController);

module.exports = userRouter;
