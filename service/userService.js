const emailValidator = require('email-validator');
const { userModel } = require('../model');
const { findByEmail } = require('../model/userModel');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !emailValidator.validate(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (await userModel.findByEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await findByEmail(email);

  if (
    !user
    || user.email !== email
    || user.password !== password
    || !emailValidator.validate(user.email)
  ) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  return next();
};

module.exports = {
  createUser,
  userLogin,
};
