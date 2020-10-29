const express = require('express');
const bodyParser = require('body-parser');

// const Users = require('./models/userModel');
// const jwtValidation = require('./middlewares/auth/validateJWT');

const UsersController = require('./controllers/usersController');
const LoginController = require('./controllers/loginController');
const RecipesController = require('./controllers/recipesController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

// Cadastra novo usuário----------------------------------------------
app.post('/users', UsersController.createUser);

// Realiza o Login (gera o token)-------------------------------------
app.post('/login', LoginController.login);

app.post('/recipes', authMiddleware, RecipesController.createRecipe);

app.get('/recipes', RecipesController.allRecipes);
app.get('/recipes/:id', RecipesController.getRecipeById);

app.get('/home', RecipesController.allRecipes);
app.get('/hme/:id', RecipesController.getRecipeById);

app.listen(port, () => console.log(`App voando na ${port}`));
