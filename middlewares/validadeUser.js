const Joi = require('joi');

/** Schemas */
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const data = (req, res, next) => {
  // console.log(sales);
  const { error } = userSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const login = (req, res, next) => {
  // console.log(sales);
  const { error } = loginSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(401).send({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = { data, login };
