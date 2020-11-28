const userModel = require('../models/userModel');

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

module.exports = { register };
