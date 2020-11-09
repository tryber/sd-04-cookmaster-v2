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
    // const { user } = req;
    // if (user) {
    //   const { _id } = user;
    //   const userReceipes = await crudModel.find('recipes', { userId: _id });
    //   return res.status(200).json(userReceipes);
    // }

    const Allrecipes = await crudModel.find('recipes');
    return res.status(200).json(Allrecipes);
  });

module.exports = router;
