const { Router } = require('express');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');
const { validateJWT } = require('./middlewares/auth');

const routes = Router();

routes.post('/users', userController.registerUser);
routes.post('/login', userController.userLogin);

routes.post('/recipes', validateJWT, recipeController.newRecipe);
routes.get('/recipes', recipeController.getAllRecipes);

module.exports = routes;
