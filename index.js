const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers');
const { errorHandler } = require('./middlewares');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/login', routes.loginRouter);
app.use('/recipes', routes.recipesRouter);
app.use('/users', routes.usersRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(errorHandler);
