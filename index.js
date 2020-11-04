const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = require('./router');

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads') é o caminho da pasta
// onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Cadastrar usuário
app.use('/users', router.usersRouter);

app.listen(port, () => console.log(`Funfou!!! Listening on port: ${port}`));
