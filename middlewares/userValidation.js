const validator = require('validator');

module.exports = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!name || !password || !email || !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};
