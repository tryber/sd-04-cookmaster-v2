const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { PORT } = require('./src/config');
const routers = require('./src/routers');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routers.userRouter);
app.use('/login', routers.loginRouter);
app.use('/recipes', routers.recipesRouter);

const port = PORT || 3000;

app.listen(port, console.log(`Server listening on port ${port}`));
