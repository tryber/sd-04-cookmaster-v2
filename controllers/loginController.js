const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();
const { findByEmail } = require('../models/userModel');
const { loginValidationMiddleware } = require('../services/loginServices');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};
const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

router.post('/', loginValidationMiddleware, async (req, res) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(200).json({ token });
});

module.exports = router;
