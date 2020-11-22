const express = require('express');
const { createToken } = require('../middlewares/createJWT');

const router = express.Router();

const { findUserByEmail } = require('../models/userModel');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const userEmail = await findUserByEmail(email);
  if (!userEmail || password !== userEmail.password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = createToken(userEmail);

  return res.status(200).json(token);
});

module.exports = router;
