const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const recipesRoute = require('./routes/recipesRoute');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  response.send();
});

// Routes
app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);
app.use('/image', express.static(path.join(__dirname, '/uploads')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
