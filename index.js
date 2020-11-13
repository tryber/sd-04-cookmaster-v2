const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const userController = require('./controllers/user');

app.use('/users', userController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}!`));
