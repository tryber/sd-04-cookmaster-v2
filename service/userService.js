const emailValidator = require('email-validator');
const { userModel } = require('../model');

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

module.exports = {
  createUser,
};
