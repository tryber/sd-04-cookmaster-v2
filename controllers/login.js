const express = require('express');

const validations = require('../middlewares/loginValidations');

const services = require('../services/token');

const router = express.Router();

router.post(
  '/',
  validations.existingElements,
  validations.existingUser,
  services.tokenCreation,
  services.tokenValidation,
  async (req, res) => {
    const token = req.headers.authorization;
    res.status(200).json({ token });
  },
);

module.exports = router;
