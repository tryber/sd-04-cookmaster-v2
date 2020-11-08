const express = require('express');
const path = require('path');
const usersController = require('./controllers/usersController');
const login = require('./controllers/login');

const imgDirectory = express.static(path.join(__dirname, '/images'));

const app = express();
app.use(express.json());
app.use('/images', imgDirectory);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('ok');
});

app.post('/login', login);

app.use('/users', usersController);

app.listen(3000);
