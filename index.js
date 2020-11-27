const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'uploads')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const routes = require('./routes');

app.use('/users', routes.userRouter);
app.use('/recipes', routes.recipeRouter);
app.use('/login', routes.loginRouter);
app.use('/images', routes.imageRouter);

app.listen(3000, () => console.log('Listening on 3000'));
