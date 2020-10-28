const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', Controller.userController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Running... Soo far soo good'));
