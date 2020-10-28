const express = require('express');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));
