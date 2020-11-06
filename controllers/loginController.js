const express = require('express');
const usersModel = require('../models/usersModel');
const { signInValidation } = require('../middlewares/validations');
const { createToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/',
  signInValidation,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      const user = await usersModel.getUserByMail(email);
      console.log(user.email);

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
