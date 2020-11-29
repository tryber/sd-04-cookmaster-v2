const express = require('express');
const path = require('path');

const { usersController, loginController, recipesController } = require('./controllers');

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/images', express.static(path.join(__dirname, '/images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
