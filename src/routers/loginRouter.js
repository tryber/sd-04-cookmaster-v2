const { Router } = require('express');
const { usersController } = require('../controllers');
// const { validateToken } = require('../service');
const validations = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', validations.validLogin, usersController.loginController);

module.exports = loginRouter;
