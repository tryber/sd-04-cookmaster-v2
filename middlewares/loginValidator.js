const responseMessage = (message) => ({ message });

const UserModel = require('../models/userModel');

const validateEmailLogin = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(responseMessage('Invalid entries. Try again.'));
  }
  const isEmailValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);
  if (!isEmailValid) {
    return res.status(400).json(responseMessage('Invalid entries. Try again.'));
  }
  next();
};

const emailLoginMustBeUnique = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await UserModel.getUserByEmail(email);
  if (emailExists) {
    return res.status(409).json(responseMessage('Email already registered'));
  }
  next();
};

module.exports = {
  responseMessage,
  validateEmailLogin,
  emailLoginMustBeUnique,
};
