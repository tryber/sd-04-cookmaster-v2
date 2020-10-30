require('dotenv').config();
const path = require('path');

const express = require('express');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const recipesRouter = require('./routes/recipesRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.post('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

// /home/juniomelos/sd-04-cookmaster-v2/controllers/images/5f9c6bc46da62928a42abb55.jpeg
