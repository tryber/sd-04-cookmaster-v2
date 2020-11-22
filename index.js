const express = require('express');

const { userRouter, loginRouter, recipeRouter } = require('./routes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
