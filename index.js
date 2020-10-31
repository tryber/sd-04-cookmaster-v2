const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const recipeController = require('./controller/recipeController');
const validateJWT = require('./auth/validateJWT');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static('images'));

const upload = multer({ dest: 'images' });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userController.register);
app.post('/login', userController.login);

app.post('/recipes', validateJWT, recipeController.registerRecipe);
app.get('/recipes', recipeController.listRecipes);
app.get('/recipes/:id', recipeController.listOneRecipe);
app.put('/recipes/:id', validateJWT, recipeController.editRecipe);
app.delete('/recipes/:id', validateJWT, recipeController.deleteRecipe);

app.put('/recipes/:id/image/', validateJWT, upload.single('image'), recipeController.insertImage);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
