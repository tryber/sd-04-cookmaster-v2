const express = require('express');
const validateToken = require('../middlewares/auth/validateToken');
const permissionValidation = require('../middlewares/permissionValidation');
const { recipeFieldsValidation, recipeExistsValidation } = require('../middlewares/recipesValidations');
const recipesModel = require('../models/recipesModel');
const { HTTPStatus } = require('../services/httpStatus');
const uploadImage = require('../services/uploadImage');

const router = express.Router();

// Lista todas as receitas
router.get('/', async (_req, res) => {
  try {
    const allRecipes = await recipesModel.getAllRecipes();
    return res.status(HTTPStatus.OK).json(allRecipes);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.INTERNAL_ERROR);
  }
});

// Lista receita específica
router.get('/:id',
  async (req, res) => {
    try {
      const recipe = await recipesModel.getRecipeById(req.params.id);

      if (recipe === null) {
        return res.status(HTTPStatus.NOT_FOUND).json({ message: 'recipe not found' });
      }

      return res.status(HTTPStatus.OK).json(recipe);
    } catch (_error) {
      return res.error;
    }
  });

// Registra novas receitas
router.post('/',
  recipeFieldsValidation,
  validateToken,
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { name, ingredients, preparation } = req.body;

      // req.body.role injetado diretamente no addUser, com valor 'user'.
      const recipe = await recipesModel.addRecipe(name, ingredients, preparation, _id);

      return res.status(HTTPStatus.CREATED).json({ recipe });
    } catch (_err) {
      return res.status(HTTPStatus.BAD_REQUEST);
    }
  });

// atualiza receita com imagem uploaded
router.put(
  '/:id/image',
  validateToken,
  permissionValidation,
  uploadImage,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;
      const imagePath = `localhost:3000/images/${filename}`;

      console.log(`req.params.id: ${id}, req.file.filename: ${filename}, imagePAth: ${imagePath}`);
      const recipe = await recipesModel.getRecipeById(id);

      if (!recipe) {
        return res.status(HTTPStatus.NOT_FOUND).json({ message: 'Recipe not found' });
      }

      await recipesModel.updateWithImage(id, imagePath);

      const recipeWithImg = await recipesModel.getRecipeById(id);

      return res.status(HTTPStatus.OK).json(recipeWithImg);
    } catch (_err) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY);
    }
  },
);

// Atualiza receitas (usuário dono da receita ou admin)
router.put('/:id',
  recipeFieldsValidation,
  validateToken,
  permissionValidation,
  async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
      await recipesModel.updateRecipe(data, id);
      const updatedRecipe = await recipesModel.getRecipeById(id);

      return res.status(HTTPStatus.OK).json(updatedRecipe);
    } catch (_error) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY);
    }
  });

// Deleta receitas
router.delete('/:id',
  recipeExistsValidation,
  validateToken,
  permissionValidation,
  async (req, res) => {
    try {
      const { id } = req.params;

      await recipesModel.deleteRecipe(id);

      return res.status(HTTPStatus.NO_CONTENT).json({ message: 'successuful deleted' });
    } catch (_e) {
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY);
    }
  });

module.exports = router;
