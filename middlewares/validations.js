const Joi = require('@hapi/joi');

const fieldsUser = Joi.object({
  email: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
    .messages({
      'string.pattern.base': 'Invalid entries. Try again.',
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'string.min': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  name: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'string.min': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  password: Joi.string()
    .min(6)
    .max(18)
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'string.min': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
});

module.exports = fieldsUser;
