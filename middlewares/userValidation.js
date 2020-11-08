const validator = require('validator');

module.exports = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const validateName = !validator.isLength(name, { min: 3 });
  const validateEmail = !validator.isEmail(email);
  const validatePassword = !validator.isLength(password, { min: 3 });

  if (validateName || validateEmail || validatePassword) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};
