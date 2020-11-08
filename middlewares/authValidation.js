const usersModel = require('../models/usersModel');
const { HTTPStatus } = require('../services/httpStatus');
const validateToken = require('./auth/validateToken');

const authValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTPStatus.UNAUTHORIZE).json({ message: 'missing auth token' });
  }
  try {
    // verifico junto ao jwt se o token do meu usuario é valdo.
    // A função validateToken recebe token e retorna o payload.
    // Assim, terei acesso ao email via payload.email
    const payload = validateToken(token);
    const user = usersModel.getUserByMail(payload.email);
    // injeto o valor do usuário, após a validação via middware.
    req.user = user;
    next();
  } catch (_e) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = authValidation;
