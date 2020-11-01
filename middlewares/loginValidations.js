const model = require('../models/login');

const message = 'All fields must be filled';

const existingElements = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(401).json({ message });
  next();
};

const existingUser = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await model.loginCheck(email, password);
  if (result === null) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const { password: _, ...data } = result;
  req.data = data;
  next();
};

module.exports = {
  existingElements,
  existingUser,
};
