const express = require('express');

const userController = require('./controllers/userControllers');
const UserLogin = require('./controllers/loginUserController');
const userMiddleware = require('./middleware/userValidate');

const app = express();
const PORT = 3000;

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userMiddleware.validaUser, userController);
app.use('/login', userMiddleware.validaLogin, userMiddleware.validaToken, UserLogin);

app.use('*', (req, res) => res.status(404).send('Pagina não encontrada'));

app.listen(PORT, () => console.log('========== Aplicacao rodando =========='));
