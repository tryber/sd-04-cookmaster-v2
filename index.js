const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', route.userRoute);
app.use('/login', route.loginRoute);
app.use('/recipes', route.recipeRoute);

app.listen(PORT, () => {
  console.log('Running...');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);
