const express = require('express');

const userModel = require('../models/userModel');
const userValidations = require('../middlewares/userValidations');

const router = express.Router();

router.post(
  '/',
  userValidations.requiredFields,
  userValidations.isValidEmail,
  userValidations.validateUserExistsByEmail,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const role = 'user';
      const user = await userModel.registerUser(name, email, password, role);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (_error) {
      console.log(_error.message);
      res.status(501).json({ message: 'Falha ao cadastrar usuário' });
    }
  },
);

module.exports = router;
