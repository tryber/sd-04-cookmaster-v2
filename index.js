const express = require('express');
const bodyParse = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname + '/uploads'));

app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use('/', routes.userRoutes, routes.recipeRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Aplicação rodando!'));
