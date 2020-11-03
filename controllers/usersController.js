const express = require('express');
const usersModel = require('../models/usersModel');
const userValidations = require('../middlewares/userValidations');

const router = express.Router();

router.post(
  '/',
  userValidations.requiredFields,
  userValidations.validateEmail,
  async (req, res) => {
    const { name, email, password } = req.body;

    const user = await usersModel.createUser(name, email, password);

    return res.status(201).json({ user });
  },
);

router.post('/', async (req, res) => {
  console.log(req.body);
});

module.exports = router;
