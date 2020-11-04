require('dotenv').config();
const path = require('path');

const express = require('express');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', route.users);
app.use('/login', route.login);
app.use('/recipes', route.recipes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));
