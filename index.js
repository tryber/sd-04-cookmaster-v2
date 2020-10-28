const express = require('express');
const path = require('path');

const UserController = require('./controllers/userController');

const RecipeController = require('./controllers/recipeController');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', UserController);

app.use('/recipes', RecipeController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('=-----> Server running on port 3000 <-----=');
});

module.exports = app;
