const express = require('express');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/login');
const recipesController = require('./controllers/recipes');

const app = express();

app.use(express.json());

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('conected');
});
