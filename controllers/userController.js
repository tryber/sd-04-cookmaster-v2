const express = require('express');

const router = express.Router();

const { addUser } = require('../models/userModel');
const { userDataValidationMiddleware, emailValidationMiddleware } = require('../services/userServices');

router.post('/', emailValidationMiddleware, userDataValidationMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addUser(name, email, password, 'user');
  console.log(user);
  return res.status(201).json({ user });
});

module.exports = router;
