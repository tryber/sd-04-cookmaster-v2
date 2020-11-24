const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const validationName = (req, res, next) => {
  const testName = req.body.name;
  if (!testName) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const alreadyRegisteredEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailIsInDB = await userModel.findByEmail(email);
  if (emailIsInDB) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const validEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validToken = async (req, res, next) => {
  const secret = 'cookmaster';
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const data = jwt.verify(token, secret);
    const { iat, exp, ...userData } = data;
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validationName,
  validationPassword,
  alreadyRegisteredEmail,
  validEmail,
  validRecipe,
  validToken,
};
