const express = require('express');
const usersController = require('./controllers/usersController');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log('Server started on port 3000');
});
