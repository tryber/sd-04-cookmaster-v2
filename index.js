const express = require('express');
const usersController = require('./controllers/usersController');
// const recipesController = require('./controllers/recipesController');
const errors = require('./middlewares/errors');

const app = express();
const port = 3000;

app.use(express.json());

// Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);
// app.use('/recipes', recipesController);

app.use('*', errors.notFound);
app.use(errors.internal);

app.listen(port, () => console.log('Running...'));
