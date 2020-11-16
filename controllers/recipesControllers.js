const router = require('express').Router();
const multer = require('multer');
const crudModel = require('../models/crudModel');
const logindValidations = require('../middlewares/JWT');
const validateRecipes = require('../middlewares/validateRecipes');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post(
  '/',
  logindValidations.validateJWT(),
  logindValidations.validateLogin,
  validateRecipes.validateFields,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await crudModel.createOne('recipes', {
      name,
      ingredients,
      preparation,
      userId: _id,
    });
    res.status(201).json({ recipe });
  },
);

router.get(
  '/',
  logindValidations.validateJWT(false),
  logindValidations.validateLogin,
  async (_req, res) => {
    const Allrecipes = await crudModel.findAll('recipes');
    return res.status(200).json(Allrecipes);
  },
);

router.get(
  '/:id',
  logindValidations.validateJWT(false),
  logindValidations.validateLogin,
  async (req, res) => {
    const { id } = req.params;
    const recipe = await crudModel.findById('recipes', id);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  },
);

router.put(
  '/:id',
  logindValidations.validateJWT(),
  logindValidations.validateLogin,
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
  },
);

router.delete(
  '/:id',
  logindValidations.validateJWT(),
  logindValidations.validateLogin,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const recipe = await crudModel.findById('recipes', id);
    if (role === 'admin' || _id === recipe.userId) {
      await crudModel.deleteOne('recipes', id);
      return res.status(204).json();
    }
    return res.status(401).json({ message: 'you cant delete this recipe' });
  },
);

router.put(
  '/:id/image',
  logindValidations.validateJWT(),
  logindValidations.validateLogin,
  upload.single('image'),
  async (req, res) => {
    const { id } = req.params;
    await crudModel.updateOne('recipes', id, { image: `localhost:3000/${req.file.path}` });
    const result = await crudModel.findById('recipes', id);
    res.status(200).json(result);
  },
);

module.exports = router;
