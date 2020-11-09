const express = require('express');

const authCreate = require('../auth/createToken');

const validations = require('../middlewares/loginValidations');

const model = require('../models/usersModel');

const router = express.Router();

router.post('/', validations.existingElements, validations.existingUser, async (req, res) => {
  const { email } = req.body;
  const { name, password: _, ...data } = await model.findByMail(email);
  const token = authCreate.createToken(data);
  res.status(200).json({ token });
});

module.exports = router;
