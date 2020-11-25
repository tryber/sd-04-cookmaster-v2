const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { userModel } = require('../model');
const { userService } = require('../service');

const jwtConfig = {
  expiresIn: '20m',
  algorithm: 'HS256',
};
const secret = 'SoLongAndThanksForAllTheFish';

router.post('/', userService.userLogin, async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findByEmail(email);
  const token = jwt.sign({ date: user }, secret, jwtConfig);
  res.status(200).json({ token });
});

module.exports = router;
