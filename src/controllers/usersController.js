const express = require('express');

const router = express.Router();
const userModel = require('../models/userModel');
const validations = require('../middlewares/validations');

// Criar novo usuário
router.post(
  '/',
  validations.validationName,
  validations.validationPassword,
  validations.alreadyRegisteredEmail,
  validations.validEmail,
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await userModel.createUser(name, email, password);
    return res.status(201).json({ user });
  },
);

module.exports = router;
