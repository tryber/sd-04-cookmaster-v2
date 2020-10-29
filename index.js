const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const controllers = require('./controllers');

const auth = require('./services/auth');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controllers.usersControllers.add);

app.post('/login', controllers.usersControllers.login);

app.post('/recipes', auth.authUser, controllers.recipesControllers.add)

const PORT = 3000;

app.listen(PORT, () => console.log('Listening on 3000'));
