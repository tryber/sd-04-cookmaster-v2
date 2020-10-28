const usersModel = require('../models/usersModel');

const requiredFields = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  return next();
};

const validateEmailPassword = async (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = await usersModel.findUserByEmail(email);
  const validPassword = await usersModel.findUserByPassword(password);

  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return next();
};

module.exports = { requiredFields, validateEmailPassword };
