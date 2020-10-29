const express = require('express');

const router = express.Router();

const UserModel = require('../models/userModel');
const userValidator = require('../middlewares/userValidator');

// ROTA PARA CADASTRAR NOVO USUÁRIO

router.post('/', userValidator.validateEmail, userValidator.emailMustBeUnique, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(userValidator.responseMessage('Invalid entries. Try again.'));
    }

    const user = await UserModel.registerUser(name, email, password, role);

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json(userValidator.responseMessage('Invalid entries. Try again.'));
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(userValidator.responseMessage('Something gone wrong...'));
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await UserModel.deleteUser(id);
  res.status(200).json({ message: 'user deleted...' });
});

module.exports = router;
