const crudModel = require('../models/crudModel');

const createMessages = (message) => ({ message });

const verifyEntries = (req, res, next) => {
  const { name, email, password } = req.body;

  if (name && email && password) return next();

  return res.status(400).json(createMessages('Invalid entries. Try again.'));
};

const verifyIfUserExistsByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await crudModel.findOne('users', { email });
  if (user) {
    return res.status(409).json(createMessages('Email already registered'));
  }

  return next();
};

const validateEmail = (req, res, next) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const { email } = req.body;
  if (!emailRegex.test(email)) {
    return res.status(400).json(createMessages('Invalid entries. Try again.'));
  }

  return next();
};

const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) return next();

  return res.status(401).json(createMessages('All fields must be filled'));
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await crudModel.findOne('users', { email });

  if (!user || password !== user.password) {
    return res.status(401).json(createMessages('Incorrect username or password'));
  }

  const { password: _, name: _name, ...userWhitoutPassword } = user;
  req.user = userWhitoutPassword;

  return next();
};

module.exports = {
  verifyEntries,
  verifyIfUserExistsByEmail,
  validateEmail,
  validateLoginFields,
  validateLogin,
};
