const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers');
const path = require('path');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', Controller.userController);
app.use('/login', Controller.loginController);
app.use('/recipes', Controller.recipeController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Running... Soo far soo good'));
