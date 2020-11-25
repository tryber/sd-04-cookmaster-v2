const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const controllers = require('./controllers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipeController);

app.listen(port, () => console.log(`Listening on ${port}`));
