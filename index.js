const express = require('express');
const path = require('path');
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const recipeRouter = require('./routers/recipeRouter');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

app.listen(3000, () => console.log('RUN SERVER http://127.0.0.1:3000'));
