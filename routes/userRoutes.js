const express = require('express');
const { userControllers } = require('../controllers');

const routes = express.Router();

routes.post('/login', userControllers.loginMiddleware);

routes.post('/users', userControllers.newUserMiddleware);

module.exports = routes;
