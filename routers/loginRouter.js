const { Router } = require('express');
const rescue = require('express-rescue');
const { loginValidation } = require('../middlewares');
const { usersController } = require('../controllers');

const login = Router();
login.post('/', loginValidation, rescue(usersController.login));

module.exports = login;
