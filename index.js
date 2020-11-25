const express = require('express');

const app = express();

const usersController = require('./controllers/userscontroller');
const loginController = require('./controllers/loginController');
// const recipesController = require('./controllers/recipesController');

app.use(express.json());

app.use('/users', usersController);
app.use('/login', loginController);
// app.use('/recipes', recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
