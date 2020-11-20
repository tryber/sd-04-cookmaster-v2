const emailValidator = require('email-validator');

const { findByEmail } = require('../models/userModel');

const userDataValidationMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await findByEmail(email);
  if (!name || !email || !password || !emailValidator.validate(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (user) {
    console.log('Email already registered');
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
};

module.exports = { userDataValidationMiddleware };
