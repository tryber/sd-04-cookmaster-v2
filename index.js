const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const login = require('./middlewares/login');
// const recipesController = require('./controllers/recipesController');

const port = 3000;
const app = express();

app.use(express.json());

// bodyParser - middleware para conseguir RECEBER requisições no body em json.
// Lembrando que funciona para PUT E POST
app.use(bodyParser.json());
// Urlencoded para receber requisições tanto via axios quanto form de HTML
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/login', login);
app.use('/recipes', recipesController)
// app.use('/recipes', recipesController);

app.listen(port, () => console.log('Example app listening on port port!`'));
