const joi = require('joi');
const userModel = require('../models/userModel');

const cadastroSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const validarCadastro = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validation = cadastroSchema.validate({ name, email, password });
  if (validation.error) res.status(400).json({ message: 'Invalid entries. Try again.' });
  const user = await userModel.findByEmail('users', email);
  if (user) res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = { validarCadastro };
