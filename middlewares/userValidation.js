const userModel = require('../models/userModel');
const encrypt = require('./auth');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const mailValidate = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i;
  const foundEmail = await userModel.findByName(name);

  if (!mailValidate.test(email) || !(password.length >= 6) || !name) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  } else if (foundEmail) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  return next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  const userFound = await userModel.findByEmail(email);

  if (!userFound || userFound.password !== password) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }

  return next();
};

const backToken = async (email) => {
  const user = await userModel.findByEmail(email);
  return encrypt.createToken(user);
};

module.exports = { register, login, backToken };
