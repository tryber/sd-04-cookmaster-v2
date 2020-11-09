const express = require('express');
const rescue = require('express-rescue');
const jwt = require('./helpers/jwt');
const { loginVal, login, createRecipeVal } = require('./middlewares');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const error = require('./middlewares/errors');

const app = express();
const port = 3000;

app.use(express.json());

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', rescue(loginVal), login);

app.use('/users', usersController);
app.use('/recipes', jwt.validate, createRecipeVal, recipesController);

app.use('*', error.notFound);
app.use(error.internal);

app.listen(port, () => console.log('Running...'));
