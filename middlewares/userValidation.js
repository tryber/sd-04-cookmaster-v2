const model = require('../models/models');

const buildResponse = (message) => {
  const resp = { message };
  return resp;
};

const ValidateFields = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  next();
};

const validateEmailIsUnique = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await model.findByEmail('users', email);

  if (emailExists) {
    return res.status(409).json(buildResponse('Email already registered'));
  }

  next();
};

const validateLoginFields = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json(buildResponse('All fields must be filled'));
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await model.findByEmail('users', email);

  if (!user || password !== user.password) {
    return res.status(401).json(buildResponse('Incorrect username or password'));
  }

  const { password: _, name: _name, ...userWithNoPassword } = user;
  req.user = userWithNoPassword;

  next();
};

module.exports = {
  ValidateFields,
  validateEmail,
  validateEmailIsUnique,
  validateLogin,
  validateLoginFields,
};
