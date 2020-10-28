const express = require('express');

const router = express.Router();

const UserModel = require('../models/userModel');

const userValidator = require('../middlewares/userValidator');

// criação da rota /users onde é possível cadastrar um novo usuário
router.post(
  '/users',
  userValidator.validateEmailRegex,
  userValidator.emailMustBeUnique,
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json(userValidator.responseMessage('Invalid entries. Try again.'));
      }

      const user = await UserModel.registerUser(name, email, password, role);

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(userValidator.responseMessage('Invalid entries. Try again.'));
    }
  },
);

// criação da rota /recipes onde é possível cadastrar uma nova receita
router.post('/recipes', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res.status(400).json(userValidator.responseMessage('Invalid entries. Try again.'));
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid entries, Try again.' });
  }
});
module.exports = router;
