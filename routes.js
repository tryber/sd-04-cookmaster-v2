const { Router } = require('express');
const recipeController = require('./controllers/recipesController');
const userController = require('./controllers/userController');
const validateUser = require('./middlewares/userValidation');
const validateRecipe = require('./middlewares/recipeValidation');
const encrypt = require('./middlewares/auth');
const multer = require('multer');

const routes = Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callBack) => {
    const { id } = req.params;
    callBack(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

routes.post('/users', validateUser.register, userController.register);

routes.post('/login', validateUser.login, userController.login);

routes.post('/recipes', encrypt.validateJWT, validateRecipe.register, recipeController.register);
routes.get('/recipes', recipeController.getAll);

routes.get('/recipes/:id', recipeController.getOne);
routes.put('/recipes/:id', encrypt.validateJWT, recipeController.editOne);
routes.delete('/recipes/:id', encrypt.validateJWT, recipeController.deleteOne);

routes.put(
  '/recipes/:id/image',
  encrypt.validateJWT,
  upload.single('image'),
  recipeController.edit2Image,
);

module.exports = routes;
