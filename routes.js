const { Router } = require('express');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');
const { validateJWT } = require('./middlewares/auth');
const { upload } = require('./controllers/recipeController');

const routes = Router();

routes.post('/users', userController.registerUser);
routes.post('/login', userController.userLogin);

routes.post('/recipes', validateJWT, recipeController.newRecipe);
routes.get('/recipes', recipeController.getAllRecipes);

routes.put('/recipes/:id', validateJWT, recipeController.editRecipe);
routes.get('/recipes/:id', recipeController.findRecipeById);
routes.delete('/recipes/:id', validateJWT, recipeController.deleteRecipe);

routes.put('/recipes/:id/image', validateJWT, upload.single('image'), recipeController.uploadImage);

routes.post('/recipes/admin', validateJWT, userController.registerAdmin);

module.exports = routes;
