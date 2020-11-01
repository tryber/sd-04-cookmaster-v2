const userModel = require('../models/userModel');

// Check if POST request contain a name, password and email
const validatePresenceOfUsernameEmailPassword = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

// Check if POST email is correct
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

// Check if POST request contain an unique email
const validateEmailIsUnique = async (req, res, next) => {
  const { email } = req.body;
  const emailFromDB = await userModel.findEmail(email);
  if (emailFromDB) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next();
};

// Check if POST/login request contain a email, and password
const validatePresenceOfEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

module.exports = {
  validatePresenceOfUsernameEmailPassword,
  validateEmail,
  validateEmailIsUnique,
  validatePresenceOfEmailPassword,
};
