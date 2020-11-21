const express = require('express');
const middlewares = require('./middlewares');
const controller = require('./controllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post(
  '/users',
  middlewares.validations.validarCadastro,
  middlewares.validations.existEmail,
  controller.cadastro,
);

app.post('/login', middlewares.validations.loginValidation, controller.login);

app.post(
  '/recipes',
  middlewares.auth.validJwt,
  middlewares.validations.validacaoReceita,
  controller.addRecipe,
);

app.get('/recipes', controller.allRecipes);

app.use((err, _req, res, _next) => {
  res.status(405).json(err.message);
});

app.listen(3000, console.log('rodando'));
