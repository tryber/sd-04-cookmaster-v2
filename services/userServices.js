const validator = require('email-validator');
const { findByEmail } = require('../models/userModel');

const userDataValidationMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validator.validate(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

const emailValidationMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
};

module.exports = { userDataValidationMiddleware, emailValidationMiddleware };
