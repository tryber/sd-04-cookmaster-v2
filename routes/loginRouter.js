const { Router } = require('express');
const controller = require('../controllers/loginController');
const middleware = require('../middleware/validateLogin');

const loginRouter = Router();

loginRouter.post('/', middleware.validateLogin, controller.loginUsers);

module.exports = loginRouter;
