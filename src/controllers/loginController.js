const express = require('express');

const router = express.Router();
const userModel = require('../models/userModel');

// Login
router.post('/',
  async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    // O login com sucesso depende do jwt
  });

module.exports = router;
