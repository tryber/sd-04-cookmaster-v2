const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');

const app = express();

const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);

app.use('/login', loginController);

app.use('/recipes', recipesController);

app.listen(port, () => console.log(`Server listening on port ${port}`));
