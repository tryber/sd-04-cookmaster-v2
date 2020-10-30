const express = require('express');

const bodyParser = require('body-parser');

const multer = require('multer');

const path = require('path');

const controllers = require('./controllers');

const auth = require('./services/auth');

const uploadFiles = require('./services/uploadsFiles');

const app = express();

app.use(bodyParser.json({limit: '18mb', extended: true}));

app.use(bodyParser.urlencoded({limit: '18mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    console.log(file)
    callback(null, `${file.originalname}`)
  },
});

const upload = multer({ storage });

app.post('/users', controllers.usersControllers.add);

app.post('/login', controllers.usersControllers.login);

app.post('/recipes', auth.authUser, controllers.recipesControllers.add);

app.get('/recipes', controllers.recipesControllers.getAll);

app.put('/recipes/image', upload.single('image'), (req, res) => console.log(req.file));

app.get('/recipes/:id', controllers.recipesControllers.getById);

app.put('/recipes/:id', auth.authUser, controllers.recipesControllers.update);

app.delete('/recipes/:id', auth.authUser, controllers.recipesControllers.exclude);

const PORT = 3000;

app.listen(PORT, () => console.log('Listening on 3000'));
