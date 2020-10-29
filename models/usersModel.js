const Joi = require('joi');
const { getBy } = require('./genericModel');

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
  if (result.error && result.value) return { message: 'Invalid entries. Try again.', code: 400 };

  const userInfo = await getBy('users', 'email', user.email);
  if (userInfo) return { message: 'Email already registered', code: 409 };
};

const loginValidation = async (loginInfo = {}) => {
  const result = loginSchema.validate(loginInfo);
  if (result.error && result.value) return { message: 'All fields must be filled', code: 401 };

  const userInfo = await getBy('users', 'email', loginInfo.email);
  if (!userInfo || userInfo.password !== loginInfo.password) {
    return { message: 'Incorrect username or password', code: 401 };
  }
};

module.exports = { userValidation, loginValidation };
