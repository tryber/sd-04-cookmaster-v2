const express = require('express');
const Boom = require('@hapi/boom');
const multer = require('multer');
const path = require('path');
const { userRegister, userLogin } = require('./controllers/userController');
const {
  recipeRegister,
  recipeList,
  recipeDetail,
  recipeEdit,
  recipeDelete,
  recipeImage,
} = require('./controllers/recipeController');
const auth = require('./middlewares/auth');

// const { userLogin } = require('./controllers/userController');

const app = express();
app.use(express.json());
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Iniciando...

app.post('/users', userRegister);

app.post('/login', userLogin);

app.post('/recipes', auth, recipeRegister);
app.get('/recipes', recipeList);
app.get('/recipes/:id', recipeDetail);
app.put('/recipes/:id', auth, recipeEdit);
app.delete('/recipes/:id', auth, recipeDelete);

app.put('/recipes/:id/image', auth, upload.single('image'), recipeImage);

app.use('/images', express.static(path.join(__dirname, 'images')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  if (!Boom.isBoom(err)) return res.status(500).json({ isNotErrorBoom: `${err.message}` });
  res.status(err.output.statusCode).json({ message: `${err.output.payload.message}` });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening at ${PORT}`));
