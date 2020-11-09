const router = require('express').Router();
const crudModel = require('../models/crudModel');
const validateJWT = require('../auth/validateJWT');
const validateRecipes = require('../middlewares/validateRecipes');

router.post('/',
  validateJWT(),
  validateRecipes.validateFields,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await crudModel.createOne('recipes', { name, ingredients, preparation, userId: _id });
    res.status(201).json({ recipe });
  });

router.get('/',
  validateJWT(false),
  async (_req, res) => {
    const Allrecipes = await crudModel.find('recipes');
    return res.status(200).json(Allrecipes);
  });

router.get('/:id',
  validateJWT(false),
  async (req, res) => {
    const { id } = req.params;
    const recipe = await crudModel.findById('recipes', id);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  });

router.put('/:id',
  validateJWT(),
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await crudModel.findById('recipes', id);
    if (role === 'admin' || _id === recipe.userId) {
      await crudModel.updateOne('recipes', id, { name, ingredients, preparation });
      const updateRecipe = await crudModel.findById('recipes', id);
      return res.status(200).json(updateRecipe);
    }
    return res.status(401).json({ message: 'you cant update this recipe' });
  });

module.exports = router;
