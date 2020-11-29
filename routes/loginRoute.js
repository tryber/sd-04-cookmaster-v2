const { Router } = require('express');
const rescue = require('express-rescue');

const { loginValidation } = require('../middlewares');
const { userController } = require('../controllers');

const login = Router();

login.post('/', loginValidation, rescue(userController.login));

module.exports = login;
