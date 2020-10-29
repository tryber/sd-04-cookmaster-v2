const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!email || !password || !name || validaEmail === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const emailValid = await userModel.findByEmail(email);
  console.log(emailValid);

  if (emailValid.length !== 0) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const role = 'user';

  const user = await userModel.registerUser(name, email, password, role);
  res.status(201).json({ user });
};

module.exports = {
  register,
};
