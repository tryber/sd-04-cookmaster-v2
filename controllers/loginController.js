const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();
const { findByEmail } = require('../models/userModel');
const { loginValidationMiddleware } = require('../services/loginServices');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

router.post('/', loginValidationMiddleware, async (req, res) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  console.log(token);
  res.status(200).json({ token });
});

module.exports = router;
