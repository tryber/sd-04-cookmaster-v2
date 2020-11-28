const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static('images'));

app.use(routes);

app.listen(port, () => console.log('Port 3000 on Call'));
