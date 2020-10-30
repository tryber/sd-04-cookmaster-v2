const express = require('express');
const bodyParser = require('body-parser');

const UsersController = require('./controllers/usersController');
const LoginController = require('./controllers/loginController');
const RecipesController = require('./controllers/recipesController');
const authMiddleware = require('./middlewares/authMiddleware');
const { upload } = require('./basicUpload');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

// Cadastra novo usuário----------------------------------------------
app.post('/users', UsersController.createUser);
// Cadastra novo admin----------------------------------------------
app.post('/users/admin', authMiddleware, UsersController.createAdmin);

// Realiza o Login (gera o token)-------------------------------------
app.post('/login', LoginController.login);

// Cadastra nova receita----------------------------------------------
app.post('/recipes', authMiddleware, RecipesController.createRecipe);
// Busca todas as receitas--------------------------------------------
app.get('/recipes', RecipesController.allRecipes);
// Busca receita pelo ID----------------------------------------------
app.get('/recipes/:id', RecipesController.getRecipeById);
// Atualiza uma receita-----------------------------------------------
app.put('/recipes/:id', authMiddleware, RecipesController.updateRecipe);
// Deleta uma receita-------------------------------------------------
app.delete('/recipes/:id', authMiddleware, RecipesController.deleteRecipe);

// MULTER ------------------------------------------------------------
app.put('/recipes/:id/image', authMiddleware, upload, RecipesController.uploadPhoto);

app.listen(port, () => console.log(`App voando na ${port}`));
