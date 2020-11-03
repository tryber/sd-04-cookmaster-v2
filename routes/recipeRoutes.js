const express = require('express');
const auth = require('../auth');
const multer = require('multer');
// const upload = require('../storage');
const { recipeControllers } = require('../controllers');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, '../uploads');
//   },
//   filename: (req, file, callback) => {
//     callback(null, 'localhost:3000/images/' + req.params.id + '.jpeg');
//   },
// });

// const upload = multer({ storage });
const upload = multer({ dest: 'images' });
const routes = express.Router();

routes.delete('/recipes/:id', auth, recipeControllers.deleteRecipeMiddleware);

routes.get('/images/:id.jpeg', );

routes.get('/recipes/:id', recipeControllers.getASpecificRecipeMiddleware);

routes.get('/recipes', recipeControllers.getRecipesMiddleware);

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);

routes.put('/recipes/:id/image', auth, upload.single('image'), recipeControllers.inserImageMiddleware);
// routes.put('/recipes/:id/image', auth, upload.single('image'), recipeControllers.inserImageMiddleware);

routes.put('/recipes/:id', auth, recipeControllers.changeRecipeMiddleware);

module.exports = routes;
