// Validations
const UserModel = require('../models/userModel');

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    console.log('name');
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (!email || regex.test(email)) {
    console.log('email');
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    console.log('password');
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const emailIsUnique = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidName,
  isValidPassword,
  emailIsUnique,
};
