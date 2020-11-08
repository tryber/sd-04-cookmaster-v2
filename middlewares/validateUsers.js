const crudModel = require('../models/crudModel');

const createMessages = (message) => ({ message });

const verifyEntries = (req, res, next) => {
  const { name, email, password } = req.body;

  if (name && email && password) return next();

  return res.status(400).json(createMessages('Invalid entries. Try again.'));
};

const verifyIfUserExistsByEmail = async (req, res, next) => {
  const user = await crudModel.findByEmail('users', req.body.email);
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

module.exports = {
  verifyEntries,
  verifyIfUserExistsByEmail,
  validateEmail,
};
