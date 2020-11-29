const boom = require('@hapi/boom');
const { userService } = require('../services');

const createUser = async (req, res, next) => {
  const { userInfo } = req;

  const userCreate = await userService.createUser(userInfo);

  if (!userCreate) {
    return next(boom.conflict('Email already registered'));
  }

  return res.status(201).json(userCreate);
};

const createAdmin = async (req, res, next) => {
  const { userInfo } = req;
  const { role } = req.user;

  if (role !== 'admin') {
    return next(boom.forbidden('Only admins can register new admins'));
  }

  const adminCreate = await userService.createAdmin(userInfo);

  return res.status(201).json(adminCreate);
};

const login = async (req, res, next) => {
  const { userInfo } = req;

  const log = await userService.login(userInfo);

  if (!log) {
    return next(boom.unauthorized('Incorrect username or password'));
  }

  return res.status(200).json({ token: log });
};

module.exports = {
  login,
  createUser,
  createAdmin,
};
