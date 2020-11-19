const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/users', controllers.userController);

// app.get('/', middlewares.auth(false), controllers.recipesController.allRecipes);
// não remova esse endpoint, e para o avaliador funcionar

// app.get('/recipes/search', middlewares.auth(false), controllers.recipesController.searchRecipes);
// app.get('/me/recipes', middlewares.auth(), controllers.recipesController.myRecipes);

// app.get('/recipes/new', middlewares.auth(), controllers.recipesController.createRecipePage);
// app.post('/recipes/new', middlewares.auth(), controllers.recipesController.createRecipe);

// app.get('/recipes/:id/delete', middlewares.auth(),
// controllers.recipesController.deleteRecipePage);
// app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipesController.deleteRecipe);

// app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipesController.editRecipePage);
// app.post('/recipes/:id', middlewares.auth(), controllers.recipesController.editRecipe);

// app.get('/admin', middlewares.auth(), (req, res) => 
//res.render('admin/home', { user: req.user }));

// app.post('/cadastro', controllers.userController.signup);
// app.get('/cadastro', controllers.userController.signupForm);

// app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
// app.post('/me/edit', middlewares.auth(), controllers.userController.editUser);

// app.get('/logout', controllers.userController.logout);

// app.get('/login', controllers.userController.loginForm);
// app.post('/login', controllers.userController.login);

// app.get('/recipes/:id', middlewares.auth(false), controllers.recipesController.recipePage);

// app.get('*', (_req, res) => {
//   res.status(404);
//   res.render('notFound');
// });

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('rodando'));
