const Joi = require('joi');

/** Schemas */
const recipeSchema = Joi.object({
  name: Joi.required(),
  ingredients: Joi.required(),
  preparation: Joi.required(),
}).unknown(false);

const data = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = { data };
