const UserModel = require('../models/userModel');

const responseMessage = (message) => ({ message });

const emailMustBeUnique = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await UserModel.getUserByEmail(email);
  if (emailExists) {
    return res.status(409).json(responseMessage('Email already registered'));
  }
  next();
};

// testando regex novo enviado pelo Eduardo Santos

const validateEmailRegex = async (req, res, next) => {
  const { email } = req.body;
  const isEmailValid = email.match(/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
  if (!isEmailValid) {
    return res.status(400).json(responseMessage('Invalid entries. Try again.'));
  }
  next();
};

module.exports = {
  responseMessage,
  emailMustBeUnique,
  validateEmailRegex,
};
