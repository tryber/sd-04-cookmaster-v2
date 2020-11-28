const usersModel = require('../models/usersModel');

const validateRequiredFields = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const registeredEmail = await usersModel.findUserByEmail(email);

  if (registeredEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = { validateRequiredFields, validateEmail };
