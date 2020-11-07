const express = require('express');
const bodyParser = require('body-parser');
const { userController, allController, userLogin } = require('./controllers');
const { isValidUser, authentication } = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/recipes', allController.listRecipes);// logados ou nao

app.post('/users', isValidUser, userController.register);

app.post('/login', userLogin);

app.post('/recipes', authentication, allController.NewRecipe);// logados

app.get('/recipes/:id', allController.recipeDetails);// logados ou nao

app.listen(3000, () => console.log('Te escuto na 3000!'));
