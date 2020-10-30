require('dotenv/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routes.userRoute);

app.use('/login', routes.loginRoute);

app.use('/recipes', routes.recipeRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
