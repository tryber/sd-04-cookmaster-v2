const express = require('express');

const bodyParser = require('body-parser');

const multer = require('multer');

const path = require('path');

const controllers = require('./controllers');

const auth = require('./services/auth');

const app = express();

app.use(bodyParser.json({ limit: '18mb', extended: true }));

app.use(bodyParser.urlencoded({ limit: '18mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const fileType = file.mimetype.split('/');
    const fileName = `${id}.${fileType[1]}`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

app.post('/users', controllers.usersControllers.add);

app.post('/login', controllers.usersControllers.login);

app.post('/recipes', auth.authUser, controllers.recipesControllers.add);

app.get('/recipes', controllers.recipesControllers.getAll);

app.put(
  '/recipes/:id/image',
  auth.authUser,
  upload.single('image'),
  controllers.recipesControllers.insertUrlImage,
);

app.get('/images/:imageName', controllers.recipesControllers.getImage);

app.get('/recipes/:id', controllers.recipesControllers.getById);

app.put('/recipes/:id', auth.authUser, controllers.recipesControllers.update);

app.delete('/recipes/:id', auth.authUser, controllers.recipesControllers.exclude);

app.post('/users/admin', auth.authUser, controllers.usersControllers.addAdmin);

app.use('*', (_req, res) => res.status(404).send('Página não encontrada'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening on 3000'));
