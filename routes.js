const { Router } = require('express');
const recipeController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const validate = require('./middlewares/userValidation');

const routes = Router();

routes.post('/users', validate.register, userController.register);

routes.post('/login', validate.login, userController.login);

module.exports = routes;
