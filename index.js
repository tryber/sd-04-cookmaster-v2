const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const routes = require('./routes');

app.use('/users', routes.userRouter);
// app.use('/recipes', routes.userRouter);
app.use('/login', routes.loginRouter);

app.listen(3000, () => console.log('Listening on 3000'));
