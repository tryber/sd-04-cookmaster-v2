const Joi = require('joi');
const { getBy } = require('./genericModel');
const { INVALID_ENTRIES, EMAIL_REGISTERED, LOGIN_ERROR, MISSING_FIELDS } = require('../errors');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 1 }).required(),
  password: Joi.string().required(),
  role: Joi.string(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 1 }).required(),
  password: Joi.string().required(),
}).unknown(false);

const userValidation = async (user = {}) => {
  const result = userSchema.validate(user);
  if (result.error) throw INVALID_ENTRIES;

  const userInfo = await getBy('users', 'email', user.email);
  if (userInfo) throw EMAIL_REGISTERED;
};

const loginValidation = async (loginInfo = {}) => {
  const result = loginSchema.validate(loginInfo);
  if (result.error) throw MISSING_FIELDS;

  const userInfo = await getBy('users', 'email', loginInfo.email);
  if (!userInfo || userInfo.password !== loginInfo.password) throw LOGIN_ERROR;
  return userInfo;
};

module.exports = { userValidation, loginValidation };
