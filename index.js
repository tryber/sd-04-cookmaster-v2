const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const recipeController = require('./controller/recipeController')
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.register);
app.post('/login', userController.login);
app.post('/recipes', validateJWT, recipeController.registerRecipe)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
