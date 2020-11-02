const validations = require('./validations');
const userModel = require('../models/usersModel');

const validateUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  const isError = await validations.validate({ email, name, password });
  if (isError.error) {
    return res.status(400).json({ message: isError.error.message });
  }

  next();
};

const validateExistEmail = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);
  const existEmail = await userModel.findByEmail(email);
  // console.log(existEmail);
  if (existEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = { validateUser, validateExistEmail };
