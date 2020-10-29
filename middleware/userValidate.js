const Joi = require('joi');

const createToken = require('../middleware/userAuthentication');
const userModel = require('../model/userModel');

const userCadastro = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required(),
  role: Joi.string(),
}).unknown(false);

const userLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

const validaUser = async (req, res, next) => {
  const { body } = req;
  const { error } = userCadastro.validate(body);

  const emailBD = await userModel.getByEmail(body.email);

  if (emailBD && emailBD.email === body.email) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  if (error) return res.status(400).json({ message: 'Invalid entries. Try again.' });

  next();
};

const validaLogin = async (req, res, next) => {
  const { body } = req;
  const { error } = userLogin.validate(body);

  const user = await userModel.getByEmail(body.email);

  if (error) return res.status(401).json({ message: 'All fields must be filled' });

  if (!user || user.password !== body.password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const { password: _, ...userSafe } = user;

  req.user = userSafe;

  next();
};

module.exports = {
  validaLogin,
  validaUser,
};
