const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());

const userController = require('./controllers/user');
const loginController = require('./controllers/login');
const recipesController = require('./controllers/recipes');

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/images', express.static(path.join(__dirname, '/images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}!`));
