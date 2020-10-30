const express = require('express');

const recipeRouter = require('./routers/recipesRouters');
const userRouter = require('./routers/usersRouters');
const loginRouter = require('./routers/loginRouter');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (request, response) => response.send());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

app.use('*', (req, res) => res.status(404).send('Pagina não encontrada'));

app.listen(PORT, () => console.log('========== Aplicacao rodando =========='));
