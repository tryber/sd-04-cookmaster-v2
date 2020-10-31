const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middleware');

const loginRouter = Router();

loginRouter.post('/', middleware.validateLogin, controller.loginUsers);

module.exports = loginRouter;
