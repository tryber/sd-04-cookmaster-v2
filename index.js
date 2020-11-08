const express = require('express');
const path = require('path');
const usersController = require('./controllers/usersController');
const userValidator = require('./middlewares/userValidation');
const userAuth = require('./middlewares/userAuth');
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

app.route('/users')
  .get(usersController.getAll)
  .post(userValidator, usersController.add);

app.route('/recipes')
  .get(recipesController.getAll)
  .post(userAuth, recipesValidator, recipesController.add);

app.post('/login', usersController.login);

app.listen(3000);
