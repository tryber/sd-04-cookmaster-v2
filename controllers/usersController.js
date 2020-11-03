const express = require('express');
const usersModel = require('../models/usersModel');
const userValidations = require('../middlewares/userValidation');

const router = express.Router();

router.post(
  '/',
  userValidations.requiredFields,
  userValidations.validateEmail,
  async (req, res) => {
    const { name, email, password } = req.body;

    const user = await usersModel.registerUser(name, email, password);

    return res.status(201).json({ user });
  },
);

module.exports = router;
