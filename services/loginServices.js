const emailValidator = require('email-validator');

const { findByEmail } = require('../models/userModel');

const loginValidationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await findByEmail(email);

  if (
    !user ||
    user.email !== email ||
    user.password !== password ||
    !emailValidator.validate(user.email)
  ) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return next();
};

module.exports = { loginValidationMiddleware };
