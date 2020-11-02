const express = require('express');
const auth = require('../auth');
const multer = require('multer');
const { recipeControllers } = require('../controllers');

const upload = multer({ dest: 'uploads' });
const routes = express.Router();

routes.delete('/recipes/:id', auth, recipeControllers.deleteRecipeMiddleware);

routes.get('/recipes/:id', recipeControllers.getASpecificRecipeMiddleware);

routes.get('/recipes', recipeControllers.getRecipesMiddleware);

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);

routes.put('/recipes/:id/image', auth, upload.single('image'), recipeControllers.inserImageMiddleware);

routes.put('/recipes/:id', auth, recipeControllers.changeRecipeMiddleware);

module.exports = routes;
