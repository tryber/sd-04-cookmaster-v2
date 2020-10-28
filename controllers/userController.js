const express = require('express');
const UserModel = require('../models/userModel');
const { userErrorDealer } = require('../middleware/validateInfo');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await UserModel.getUsers();
  res.status(200).json(users);
});

router.post('/', userErrorDealer, async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await UserModel.findEmail(email);
  if (!exists) {
    const userRegistered = await UserModel.registerUser(name, email, password);

    res.status(201).json({ user: userRegistered });
  } else {
    res.status(409).json({ message: 'Email already registered' });
  }
});

module.exports = router;
