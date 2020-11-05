const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routers = require('./routers');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routers.userRouter);
app.use('/login', routers.loginRouter);
app.use('/recipes', routers.recipesRouter);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
