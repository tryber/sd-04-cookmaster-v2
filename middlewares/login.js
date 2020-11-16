const express = require('express');
const usersModel = require('../models/usersModel');
const { signInValidation } = require('./loginValidations');
const { createToken } = require('./auth/createToken');

const router = express.Router();

router.post('/',
  signInValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersModel.getUserByMail(email);

      if (email !== user.email || password !== user.password) {
        return res.status(401)
          .json({ message: 'Incorrect username or password' });
      }

      const token = createToken({ email });

      return res.status(200).json({ token });
    } catch (_error) {
      return res.status(401)
        .json({ message: 'Incorrect username or password' });
    }
  });

module.exports = router;
