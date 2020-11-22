const joi = require('joi');
const userModel = require('../models/genericModel');

const cadastroSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
});

const validarCadastro = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validation = cadastroSchema.validate({ name, email, password });
  if (validation.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const existEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne('users', { email });
  if (user) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const validation = loginSchema.validate({ email, password });
  if (validation.error) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const cadastroRecipe = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

const validacaoReceita = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = cadastroRecipe.validate({ name, ingredients, preparation });
  if (recipe.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  req.recipe = req.body;
  next();
};

module.exports = { validarCadastro, existEmail, loginValidation, validacaoReceita };
