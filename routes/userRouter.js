const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddlewares:
  { validateName, validateEmail, validatePassword },
} = require('../middlewares/index');

const userRouter = Router();

const INVALID_ENTRIES = 'Invalid entries. Try again.';

userRouter.post('/', validateName(INVALID_ENTRIES), validateEmail(INVALID_ENTRIES), validatePassword(INVALID_ENTRIES), userController.createUserController);

module.exports = userRouter;
