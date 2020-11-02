const express = require('express');
const userValidations = require('../middlewares/userValidations');

const userModel = require('../model/usersModel');

const router = express.Router();

router.post(
  '/',
  userValidations.validationRequiredData,
  userValidations.validationEmailValid,
  userValidations.validateEmailExists,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.add(name, email, password);
      const { _id } = user;

      res.status(201).json({ user: { name, email, role: 'user', _id } });
    } catch (_e) {
      res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
  },
);

module.exports = router;
