const express = require('express');
const path = require('path');
const usersController = require('./controllers/usersController');
const userValidator = require('./middlewares/userValidation');
const checkAuth = require('./middlewares/checkAuth');
const verifyJWT = require('./middlewares/verifyJWT');
const recipesController = require('./controllers/recipesController');
const recipesValidator = require('./middlewares/recipesValidation');

const imgDirectory = express.static(path.join(__dirname, '/images'));

const app = express();
app.use(express.json());
app.use('/images', imgDirectory);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('ok');
});

// Users
app.route('/users')
  .get(usersController.readAll)
  .post(userValidator, usersController.createOne);

// Recipes
app.route('/recipes')
  .get(recipesController.readAll)
  .post(checkAuth, verifyJWT, recipesValidator, recipesController.createOne);

app.route('/recipes/:id')
  .get(recipesController.readOne)
  .put(checkAuth, verifyJWT, recipesController.updateOne);

app.post('/login', usersController.login);

app.listen(3000);
