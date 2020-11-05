const Joi = require('@hapi/joi');

const fieldsUser = Joi.object().keys({
  email: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
    .messages({
      'string.pattern.base': 'Invalid entries. Try again.',
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'All fields must be filled',
    }),
});

const fieldsLogin = Joi.object().keys({
  userEmail: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i))
    .messages({
      'string.pattern.base': 'Invalid entries. Try again.',
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'All fields must be filled',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'string.min': 'Invalid entries. Try again.',
      'any.required': 'All fields must be filled',
    }),
});

const fieldsIngredients = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  ingredients: Joi.string()
    .trim()
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
  preparation: Joi.string()
    .required()
    .messages({
      'string.base': 'Invalid entries. Try again.',
      'string.empty': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
});

module.exports = { fieldsUser, fieldsLogin, fieldsIngredients };
