const express = require('express');
const bodyParser = require('body-parser');

const UsersController = require('./controllers/usersController');
const LoginController = require('./controllers/loginController');

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

app.listen(port, () => console.log(`App voando na ${port}`));
