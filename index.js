const express = require('express');
const middlewares = require('./middlewares');
const controller = require('./controllers');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: 'uploads' });

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post(
  '/users/admin',
  middlewares.auth.validJwt,
  middlewares.validations.validarCadastro,
  middlewares.validations.existEmail,
  controller.registerAdmin,
);

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

app.get('/recipes/:id', controller.recipeById);

app.put('/recipes/:id', middlewares.auth.validJwt, controller.editRecipe);

app.delete('/recipes/:id', middlewares.auth.validJwt, controller.deletRecipe);

app.put(
  '/recipes/:id/image/',
  middlewares.auth.validJwt,
  upload.single('image'),
  controller.imageU,
);

app.use((err, _req, res, _next) => {
  res.status(405).json(err.message);
});

app.listen(3000, console.log('rodando'));
