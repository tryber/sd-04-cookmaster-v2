const validator = require('validator');

const userModel = require('../model/usersModel');

const buildResponse = (message) => ({ message });

const validationRequiredData = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }
  next();
};

const validationEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }
  next();
};

const validateEmailExists = async (req, res, next) => {
  const email = await userModel.findByEmail(req.body.email);
  console.log('EMAIL', email);
  if (email) {
    return res.status(409).json(buildResponse('Email already registered'));
  }
  next();
};

module.exports = { validationRequiredData, validationEmailValid, validateEmailExists };
