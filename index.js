const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use('/users', controllers.usersControllers);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipesControllers);
app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`On na porta ${port}`));
