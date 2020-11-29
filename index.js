const express = require('express');
const bodyParser = require('body-parser');

// importando userController do controller
const userController = require('./controllers/userController');
// importando login do controller
const login = require('./controllers/login');
// importando recipesController
const recipesController = require('./controllers/recipesController');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/users', userController);

app.use('/login', login);

app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Rodando no localhost:${port}...`));
