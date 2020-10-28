const express = require('express');
const UserModel = require('../models/userModel');
const Validation = require('../middlewares/validation');

const router = express.Router();

// Criar novo usuário
router.post(
  '/',
  Validation.isValidName,
  Validation.isValidEmail,
  Validation.isValidPassword,
  Validation.emailIsUnique,
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.createUser(name, email, password);
    return res.status(201).json({ user });
  },
);

module.exports = router;
