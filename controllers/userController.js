const Boom = require('@hapi/boom');
const userService = require('../services/userService');
const validation = require('../services/validation');

const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!name || !email || !password) return next(Boom.badRequest('Invalid entries. Try again.'));

  if (!emailRegex.test(email)) return next(Boom.badRequest('Invalid entries. Try again.'));

  const isAlreadyEmail = await validation.isAlreadyEmail(email);

  if (isAlreadyEmail) return next(Boom.conflict('Email already registered'));

  const response = await userService.userRegister({ name, email, password, role: 'user' });

  const { password: pass, ...dataUser } = response;

  res.status(201).json({ user: dataUser });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!email || !password) return next(Boom.unauthorized('All fields must be filled'));

  if (!emailRegex.test(email)) return next(Boom.badRequest('Incorrect username or password'));

  const isInvalidLogin = await validation.isInvalidLogin(email, password);

  if (isInvalidLogin) return next(Boom.unauthorized('Incorrect username or password'));

  const response = await userService.userLogin(email);

  res.status(200).json({ token: response });
};

module.exports = { userRegister, userLogin };
