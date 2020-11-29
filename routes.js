const { Router } = require('express');
const recipeController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const validateUser = require('./middlewares/userValidation');
const validateRecipe = require('./middlewares/recipeValidation');
const encrypt = require('./middlewares/auth');

const routes = Router();

routes.post('/users', validateUser.register, userController.register);

routes.post('/login', validateUser.login, userController.login);

routes.post('/recipes', encrypt.validateJWT, validateRecipe.register, recipeController.register);
routes.get('/recipes', recipeController.getAll);

routes.get('/recipes/:id', recipeController.getOne);
routes.put('/recipes/:id', encrypt.validateJWT, recipeController.editOne);
routes.delete('/recipes/:id', encrypt.validateJWT, recipeController.deleteOne);

module.exports = routes;
