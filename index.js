require('dotenv').config();

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


app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));
