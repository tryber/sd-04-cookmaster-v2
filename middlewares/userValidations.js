const userModel = require('../models/userModel');

// Validações
const requiredFields = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// email
// Referência regex do email
// https://www.w3resource.com/javascript/form/email-validation.php
const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email || !regexEmail.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const validateUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  requiredFields,
  isValidEmail,
  validateUserExistsByEmail,
};
