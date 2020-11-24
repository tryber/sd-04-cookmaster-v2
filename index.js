const express = require('express');
require('dotenv/config');
const controllers = require('./src/controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', controllers.usersController);
app.use('/login', controllers.loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
