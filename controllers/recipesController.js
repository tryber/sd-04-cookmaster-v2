const router = require('express').Router();
const crudModel = require('../models/crudModel');
const validateJWT = require('../auth/validateJWT');
const validateRecipes = require('../middlewares/validateRecipes');

router.post('/',
  validateJWT,
  validateRecipes.validateFields,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await crudModel.createOne('recipes', { name, ingredients, preparation, _id });
    res.status(201).json({ recipe });
  });

module.exports = router;
