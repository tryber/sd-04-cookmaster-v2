const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/users', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipesController);
app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/', (_req, res) => {
  res.send();
});

app.listen(3000, () => console.log('rodando'));
