const express = require('express');

const router = express.Router();
const userModel = require('../models/userModel');
const tokenMid = require('../middlewares/token');

// Login
router.post('/',
  async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    console.log(user);

    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const { password: _, ...data } = user;
    const token = tokenMid.createToken(data);
    return res.status(200).json({ token });
  });

module.exports = router;
