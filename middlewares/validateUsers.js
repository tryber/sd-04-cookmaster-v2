const { findByEmail } = require('../models');

const buildResponse = (message) => ({ message });

const verifyRegisterFields = (req, res, next) => {
  const { name, email, password } = req.body;

  if (name && password && email) return next();

  return res.status(400).json(buildResponse('Invalid entries. Try again.'));
};

const verifyUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail('users', email);

  if (user) {
    return res.status(409).json(buildResponse('Email already registered'));
  }

  return next();
};

const validateEmail = (req, res, next) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  return next();
};

const verifyLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) return next();

  return res.status(401).json(buildResponse('All fields must be filled'));
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findByEmail('users', email);

  if (!user || password !== user.password) {
    return res.status(401).json(buildResponse('Incorrect username or password'));
  }

  const { password: _, name: _name, ...userWhitoutPassword } = user;
  req.user = userWhitoutPassword;

  return next();
};

const validateAdminNewRegister = async (req, res, next) => {
  const { user } = req;
  console.log(user);

  if (user.role !== 'admin') {
    return res.status(403).json(buildResponse('Only admins can register new admins'));
  }

  return next();
};

module.exports = {
  verifyRegisterFields,
  verifyUserByEmail,
  validateEmail,
  verifyLoginFields,
  validateLogin,
  validateAdminNewRegister,
};
