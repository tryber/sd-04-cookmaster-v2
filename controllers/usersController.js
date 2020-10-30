const express = require('express');
const model = require('../models/usersModel');
const validations = require('../middlewares/userValidations');

const router = express.Router();

router.get('/', async (_, res) => {
  const users = await model.getAll();
  res.status(200).json({ users });
});

router.post(
  '/',
  validations.existingElements,
  validations.typeOf,
  validations.mailCheck,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const result = await model.signUp(name, email, password);
      res.status(201).json({ user: result });
    } catch (error) {
      console.log(error);
    }
  },
);

module.exports = router;
