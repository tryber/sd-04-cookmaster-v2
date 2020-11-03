const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

//Routes
app.use('/users', usersController);
app.use('/login', loginController);


app.listen(port, () => console.log(`Server listening on port ${port}`));
