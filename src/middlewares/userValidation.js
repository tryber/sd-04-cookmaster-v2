const userSchema = require('../schemas/userSchema');
const usersModel = require('../models/usersModel');

const validateNewUser = async (req, res, next) => {
  const joiValidation = await userSchema.validateAsync(req.body);

  if (joiValidation.error) {
    console.log(joiValidation);
    res.status(422).json({ message: 'invalid_input' });
  }

  next();
};

module.exports = validateNewUser;
