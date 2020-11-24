const userModel = require('../models/userModel');

const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
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

module.exports = {
  validationName,
  validationPassword,
  alreadyRegisteredEmail,
  validEmail,
};
