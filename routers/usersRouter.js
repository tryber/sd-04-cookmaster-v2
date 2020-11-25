const { Router } = require('express');
const rescue = require('express-rescue');

const { usersValidation } = require('../middlewares');
const { usersController } = require('../controllers');

const users = Router();

users.post('/', usersValidation, rescue(usersController.createUser));
users.post('/admin', usersValidation, rescue(usersController.createAdmin));

module.exports = users;
