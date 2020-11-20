const express = require('express');

const router = express.Router();

const { createUser } = require('../models/userModel');
const { userDataValidationMiddleware } = require('../services/userServices');

router.post('/', userDataValidationMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password, 'user');
  return res.status(201).json({ user });
});

module.exports = router;
