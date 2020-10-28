const express = require('express');
const UserModel = require('../models/userModel');
const userErrorDealer = require('../middleware/validateInfo');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await UserModel.getUsers();
  res.status(200).json(users);
});

router.post('/', userErrorDealer, async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await UserModel.findEmail(email);
  if (!exists) {
    const user = await UserModel.registerUser(name, email, password, role);

    res.status(201).json({ user: user });
  } else {
    res.status(409).json({ "message": 'Email already registered' });
  }
});

module.exports = router;
