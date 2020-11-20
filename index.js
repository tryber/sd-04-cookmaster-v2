const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipesController);


// app.get('/admin', middlewares.auth(), (req, res) =>
// res.render('admin/home', { user: req.user }));

// app.post('/cadastro', controllers.userController.signup);
// app.get('/cadastro', controllers.userController.signupForm);

// app.get('/me/edit', middlewares.auth(), controllers.userController.editUserForm);
// app.post('/me/edit', middlewares.auth(), controllers.userController.editUser);

// app.get('/logout', controllers.userController.logout);

// app.get('/login', controllers.userController.loginForm);
// app.post('/login', controllers.userController.login);

// app.get('*', (_req, res) => {
//   res.status(404).json('message: route notFound');
// });

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('rodando'));
