const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
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

module.exports = { data };
