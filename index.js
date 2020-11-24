const express = require('express');
require('dotenv/config');
const path = require('path');
const controllers = require('./src/controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens
// ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
