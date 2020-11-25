const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', controllers.userControler);
app.use('/login', controllers.loginControler);
app.use('/recipes', controllers.recipesController);

app.listen(port, () => console.log(`Listening on ${port}`));
