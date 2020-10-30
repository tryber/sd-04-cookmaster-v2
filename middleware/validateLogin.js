const { getUserEmailMod } = require('../models/usersModel');
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schema.validate(body);

    if (error) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await getUserEmailMod(body.email);

    if (!user || user.password !== body.password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const { password: _, ...userWhitoutPass } = user;

    req.userWhitoutPass = userWhitoutPass;
  } catch (error) {
    console.error('validateLogin', error);
  }

  next();
};

module.exports = { validateLogin };
