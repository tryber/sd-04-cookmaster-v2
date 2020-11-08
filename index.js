const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

/** Routes */
app.use('/', routes.userRoutes);

/** Express Rescue */
// app.use(({ message, code }, _req, res, _next) => res.status(code).json({ message }));

app.listen(3000, () => console.log('listening on port port!'));
