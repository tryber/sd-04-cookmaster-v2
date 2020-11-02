const userModel = require('../models/userModel');

const message = 'Invalid entries. Try again.';

const emailVerify = async (req, res, next) => {
  const { email } = req.body;
  const findByEmail = await userModel.findByEmail(email);
  if (findByEmail) return res.status(409).json({ message: 'Email already registered' });
  const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!emailRegex.test(email)) return res.status(400).json({ message });
  next();
};

const namePasswordEmailVerify = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) return res.status(400).json({ message });
  next();
};

module.exports = {
  emailVerify,
  namePasswordEmailVerify,
};
