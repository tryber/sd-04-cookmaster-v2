const express = require('express');
const bodyParser = require('body-parser');
// const validateJWT = require('./service/validateJWT');

const userController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// rota para adicionar usuario
app.post('/users', userController.addUserController);

// rota pra fazer login
app.post('/login', loginController.loginUser);

// rotas de receita
app.use('/recipes', recipesController);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});
