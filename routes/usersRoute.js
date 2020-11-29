const { Router } = require('express');
const rescue = require('express-rescue');

const { userValidation, auth } = require('../middlewares');
const { userController } = require('../controllers');

const users = Router();

users.post('/', userValidation, rescue(userController.createUser));

users.post('/admin', userValidation, auth(), rescue(userController.createAdmin));

module.exports = users;
