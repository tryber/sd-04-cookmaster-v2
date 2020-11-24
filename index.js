const express = require('express');
const path = require('path');

const { userRouter, loginRouter, recipeRouter } = require('./routes');

const app = express();

const PORT = 3000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
