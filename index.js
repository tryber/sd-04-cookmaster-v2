const express = require('express');
// const path = require('path');

const app = express();

const userController = require('./controllers/userController');

const recipeController = require('./controllers/recipeController');

const loginController = require('./controllers/loginController');

app.use(express.json());

// app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userController);

app.use('/recipes', recipeController);

app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('=-----> Server running on port 3000 <-----=');
});
