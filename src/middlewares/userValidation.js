const userSchema = require('../schemas/userSchema');
const usersModel = require('../models/usersModel');

const validateUserInput = async (req, res, next) => {
  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const userExists = await usersModel.findUserByEmail(req.body.email);

  if (userExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = validateUserInput;
