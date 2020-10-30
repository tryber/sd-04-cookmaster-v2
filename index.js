const express = require('express');
const usersController = require('./controllers/usersController');

const app = express();

app.use('/users', usersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('conected');
});
