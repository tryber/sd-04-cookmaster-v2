const express = require('express');
const bodyParser = require('body-parser');
const { userController, allController, loginController } = require('./controllers');
const { isValidUser } = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', isValidUser(), userController.register);

app.post('/login', loginController);

app.get('/recipes', allController.listRecipes);// logados ou nao
app.post('/recipes', allController.NewRecipe);// logados

app.get('/recipes/:id', allController.recipeDetails);// logados ou nao

app.listen(3000, () => console.log('Te escuto na 3000!'));
