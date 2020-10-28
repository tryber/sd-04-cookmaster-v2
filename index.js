const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.use('/users', userController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Conectado'));
