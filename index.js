const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const userController = require('./controllers/user');
const loginController = require('./controllers/login');

app.use('/users', userController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}!`));
