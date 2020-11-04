const Joi = require('joi');
const userEmailMod = require('../models/usersModel');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUsers = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    const email = await userEmailMod.getUserEmailMod(body.email);

    if (email) {
      return res.status(409).json({ message: 'Email already registered' });
    }
  } catch (error) {
    console.error('validateUser', error);
  }

  next();
};

module.exports = validateUsers;
