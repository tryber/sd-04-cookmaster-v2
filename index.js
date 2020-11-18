const express = require('express');
const userRouter = require('./routes/userRouter');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
