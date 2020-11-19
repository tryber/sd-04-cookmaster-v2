const express = require('express');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const loginController = require('./controllers/loginController');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/images', imageController);
app.use('/login', loginController);
app.use('/users', usersController);
app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => {
  console.log('Server started on port 3000');
});
