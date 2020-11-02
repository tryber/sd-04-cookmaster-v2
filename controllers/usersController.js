const express = require('express');
const usersModel = require('../models/usersModel');
const validate = require('../middlewares/middleValidateUser');

const router = express.Router();

// POST /users
router.post('/', validate.validateUser, validate.validateExistEmail, async (req, res) => {
  try {
    const role = 'user';
    const { name, email, password } = req.body;
    const user = await usersModel.add(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(501).json({ message: 'Falha ao cadastrar usuário.' });
  }
});

module.exports = router;
