const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const app = express();

// app.use(express.static(__dirname + '/uploads'));

app.use(express.json());
app.use('/users', controllers.users);
app.use('/login', controllers.login);
app.use('/recipes', controllers.recipes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
const port = 3000;

app.listen(port, () => console.log(`app running on port ${port}`));
