const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use('/users', controllers.users);
app.use('/login', controllers.login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
const port = 3000;

app.listen(port, () => console.log(`app running on port ${port}`));
