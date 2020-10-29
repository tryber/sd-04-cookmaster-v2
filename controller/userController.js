const userModel = require('../models/userModel');

const isValid = (name, email, password, res) => {
  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!email || !password || !name || validaEmail === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
};

const verifyDuplicated = async (email, res) => {
  const emailValid = await userModel.findByEmail(email);
  if (emailValid !== undefined) {
    return res.status(409).json({ message: 'Email already registered' });
  }
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  isValid(name, email, password, res);
  verifyDuplicated(email, res);

  const user = await userModel.registerUser(name, email, password, (role = 'user'));
  delete user.password;
  res.status(201).json({ user });
};

module.exports = {
  register,
};
