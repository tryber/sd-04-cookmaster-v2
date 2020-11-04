const express = require('express');
const usersController = require('./controllers/usersController');
const login = require('./controllers/login');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', usersController);

app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('CookMaster V2');
});

app.listen(port, () => console.log(`Cookmaster v2 running on port ${port}`));
