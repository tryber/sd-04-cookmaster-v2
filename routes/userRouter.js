const { Router } = require('express');
const { userController } = require('../controllers');
const { validateName, validateEmail, validatePassword } = require('../middlewares/index');

const userRouter = Router();

userRouter.post('/', validateName, validateEmail, validatePassword, userController.createUserController);

module.exports = userRouter;
