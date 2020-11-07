const usersModel = require('../models/usersModel');
const { HTTPStatus } = require('../services/httpStatus');
const validateToken = require('./auth/validateToken');

const signUpValidation = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  // Espressão regex consultada externamente (https://regex101.com/library/SOgUIV)
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email) || !name || !password) {
    return res.status(400)
      .json({ message: 'Invalid entries. Try again.' });
  }

  const isEmailAlreadyUsed = await usersModel.getUserByMail(email);

  if (isEmailAlreadyUsed) {
    return res.status(409)
      .json({ message: 'Email already registered' });
  }

  return next();
};

const signInValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401)
      .json({ message: 'All fields must be filled' });
  }
  return next();
};

const authValidation = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { username } = validateToken(token);

    req.username = username;
    console.log(username);
    next();
  } catch (_e) {
    return res.status(HTTPStatus.UNAUTHORIZE).json({ message: 'missing auth token' });
  }
};

module.exports = {
  signUpValidation,
  signInValidation,
  authValidation,
};
