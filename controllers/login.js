const express = require('express');

const validations = require('../middlewares/loginValidations');

const services = require('../services/token');

const model = require('../models/login');

const router = express.Router();

router.post(
  '/',
  validations.existingElements,
  validations.existingUser,
  services.tokenCreation,
  async (_, res) => {
    const result = await model.checkToken();
    res.status(200).json({ token: result.token });
  },
);

module.exports = router;
