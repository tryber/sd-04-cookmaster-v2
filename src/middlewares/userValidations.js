const usersModel = require('../models/usersModel');

const requiredFieldsExists = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const emailIsValid = (req, res, next) => {
  const { email } = req.body;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailValidation = re.test(String(email).toLowerCase());
  if (!emailValidation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const userExists = async (req, res, next) => {
  const { email } = req.body;
  const userFound = await usersModel.findUserByEmail(email);
  if (userFound) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  requiredFieldsExists,
  emailIsValid,
  userExists,
};
