// Inspired by Trybe lecture JWT
const express = require('express');
const createToken = require('../auth/createJWT');
const userModel = require('../models/userModel');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.post(
  '/',
  userValidation.validatePresenceOfEmailPassword,
  userValidation.validateEmail,
  userValidation.validateEmailIsUnique,
  async (req, res) => {
    console.log('inside logincontrollers', req.body);
    try {
      const { password, email } = req.body;

      const emailFromDB = await userModel.findEmail(email);
      if (!emailFromDB || emailFromDB.password !== password)
        return res.status(401).json({ message: 'Incorrect username or password' });

      const { password: _, ...userWithoutPassword } = emailFromDB;

      console.log('inside logincontrollers - TRY', userWithoutPassword);

      const token = await createToken(userWithoutPassword);
      return res.status(200).json({ token });
    } catch (_e) {
      console.log(_e);
      res.status(501).json({
        message: 'Error to login',
        _e,
      });
    }
  },
);

module.exports = router;
