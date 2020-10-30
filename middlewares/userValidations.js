const model = require('../models/usersModel');

const message = 'Invalid entries. Try again.';

const existingElements = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) res.status(400).json({ message });
  next();
};

const typeOf = (req, res, next) => {
  const { name, email, password } = req.body;
  if (typeof name && typeof email && typeof password !== 'string') {
    return res.status(400).json({ message });
  }
  next();
};

const mailCheck = async (req, res, next) => {
  const { email } = req.body;
  const result = await model.findByMail(email);
  if (!email.includes('@') || !email.includes('.')) res.status(400).json({ message });
  if (result !== null) res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = {
  existingElements,
  typeOf,
  mailCheck,
};
