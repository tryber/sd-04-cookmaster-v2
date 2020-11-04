const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controllers.users.postNew);

app.post('/users/admin', controllers.users.postNewAdmin);

app.post('/login', controllers.users.login);

app.use('/recipes', controllers.recipes);

app.use(({ message, code = 500 }, _req, res, _next) => res.status(code).json({ message }));

app.listen(3000, () => console.log('Xablau'));
