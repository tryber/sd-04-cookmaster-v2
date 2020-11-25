// Tratamento de Erros HTTP. Pacote = Boom | https://www.npmjs.com/package/boom
const boom = require('@hapi/boom');
const { usersService } = require('../services');

const createUser = async (req, res, next) => {
  const { info } = req;
  const resultUser = await usersService.createUser(info);

  if (!resultUser) {
    return next(boom.conflict('Email already registered'));
  }
  return res.status(201).json(resultUser);
};

const createAdmin = async (req, res, next) => {
  const { info } = req;
  const { role } = req.user;

  if (role !== 'admin') {
    return next(boom.forbidden('Only admins can register new admins'));
  }

  const resultAdmin = await usersService.createAdmin(info);

  return res.status(201).json(resultAdmin);
};

module.exports = {
  createUser,
  createAdmin,
};
