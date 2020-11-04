const userModel = require('../models/userModel');

// Validações - Cadastro
const registerRequiredFields = (req, res, next) => {
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

// Validações - Login
const loginRequiredFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);

  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!user || user.password !== password || !regexEmail.test(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  req.user = user;
  next();
};

module.exports = {
  registerRequiredFields,
  isValidEmail,
  validateUserExistsByEmail,
  loginRequiredFields,
  validateLogin,
};
