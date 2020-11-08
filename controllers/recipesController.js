const { Router } = require('express');
const multer = require('multer');

const { schemaRecipe } = require('../service/validador');
const recipeModel = require('../models/recipeModel');
const validateJWT = require('../service/validateJWT');

const recipes = Router();

// rota para criar receita com validacao
recipes.post('/', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const image = null;
  try {
    // console.log('val')
    if (await schemaRecipe.validate({ name, ingredients, preparation })) {
      const recipe = await recipeModel.addRecipe(name, ingredients, preparation, userId, image);
      return res.status(201).json({ recipe });
    }
  } catch (erro) {
    return res.status(400).json({ message: `${erro.errors[0]}` });
  }
});

// rota pra listar todas as receitas sem validacaod
recipes.get('/', async (_req, res) => {
  try {
    const allRecipes = await recipeModel.getAllRecipes();
    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(400).json({ message: 'Something bad happened' });
  }
});

// configurando o multer
const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

// rota para add imagem
recipes.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { _id: tokenId, role } = req.user;
  const image = `localhost:3000/${req.file.path}`;
  const { name, ingredients, preparation, userId } = await recipeModel.recipeById(id);
  // const { name, ingredients, preparation, userId } = recipe;
  console.log('userid 9', userId, tokenId);
  if (tokenId === userId || role === 'admin') {
    console.log('testee');
    const update = await recipeModel.updateRecipe(
      id,
      name,
      ingredients,
      preparation,
      tokenId,
      image,
    );
    console.log('update', update);
    return res.status(200).json(update);
  }

  return res.status(500).json({ message: 'Something bad happened' });
});

// rota pra listar receita por id sem validacao
recipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  // console.log('iddd', id);
  // if (ObjectId.isValid(id)) {
  // try {
  const recipeId = await recipeModel.recipeById(id);
  // console.log('recipe by id', recipeId);
  if (!recipeId) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipeId);
  // } catch (error) {
  // }
  // return res.status(400).json({ message: 'recipe not found' });
  // }
});

// rota pra atualizar receita
recipes.put('/:id', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { _id: tokenId, role } = req.user;
  const image = null;
  try {
    const receitaId = await recipeModel.recipeById(id);
    if (tokenId === receitaId.userId || role === 'admin') {
      const update = await recipeModel.updateRecipe(
        id,
        name,
        ingredients,
        preparation,
        tokenId,
        image,
      );
      // console.log('update', update);
      return res.status(200).json(update);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something bad happened' });
  }
});

// rota para deletar receita
recipes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const { _id: tokenId, role } = req.user;
  const recepeId = await recipeModel.recipeById(id);
  if (tokenId === recepeId.userId || role === 'admin') {
    await recipeModel.deleteRecipe(id);
    return res.status(204);
  }
  return res.status(500).json({ message: 'intern error' });
});
module.exports = recipes;
