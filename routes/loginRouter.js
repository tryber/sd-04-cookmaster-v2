const { Router } = require('express');
const { loginController } = require('../controllers');
const middleware = require('../middleware');

const loginRouter = Router();

loginRouter.post('/', middleware.validateLogin, loginController.loginUsers);

module.exports = loginRouter;
