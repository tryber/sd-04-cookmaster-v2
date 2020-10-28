const express = require('express');
const jwt = require('jsonwebtoken');
const { loginErrorDealer } = require('../middleware/validateInfo');
const UserModel = require('../models/userModel');

const router = express.Router();

router.post('/', loginErrorDealer, async (req, res) => {
  const secret = 'opensecret';
  try {
    const user = await UserModel.findEmail(req.body.email);
    const { password: _, ...userWithoutPassword } = user;
    const jwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };
    const tokenn = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
    res.status(200).json({ token: tokenn });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
});

module.exports = router;
