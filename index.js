const express = require('express');
const routes = require('./routers');

const app = express();

const PORT = 3000;

app.use('/users', routes.usersRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
