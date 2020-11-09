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

// funcao para atualizar receita
const atualiza = async (id, name, ingredients, preparation, tokenId, image, res) => {
  const update = await recipeModel.updateRecipe(id, name, ingredients, preparation, tokenId, image);
  return res.status(200).json(update);
};

// rota para add imagem
recipes.put('/:id/image', validateJWT, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { _id: tokenId, role } = req.user;
  const image = `localhost:3000/${req.file.path}`;
  const { name, ingredients, preparation, userId } = await recipeModel.recipeById(id);
  if (tokenId === userId || role === 'admin') {
    await atualiza(id, name, ingredients, preparation, tokenId, image, res);
  }

  return res.status(500).json({ message: 'Something bad happened' });
});

// rota pra listar receita por id sem validacao
recipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipeId = await recipeModel.recipeById(id);
  console.log('teste null', recipeId);
  if (!recipeId) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipeId);
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
      await atualiza(id, name, ingredients, preparation, tokenId, image, res);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something bad happened' });
  }
});

// rota para deletar receita
recipes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const { _id: tokenId, role } = req.user;
  const { userId } = await recipeModel.recipeById(id);
  if (tokenId === userId || role === 'admin') {
    const del = await recipeModel.deleteRecipe(id);
    if (del) {
      return res.status(204).json({ message: 'deu certo' });
    }
  }
  return res.status(500).json({ message: 'intern error' });
});
module.exports = recipes;
