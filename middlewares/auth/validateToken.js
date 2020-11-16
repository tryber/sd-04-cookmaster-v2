const jwt = require('jsonwebtoken');
const usersModel = require('../../models/usersModel');
const { HTTPStatus } = require('../../services/httpStatus');
const secret = require('./secret');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    // verifico junto ao jwt se o token do meu usuario é valdo.
    // A função validateToken recebe token e retorna o payload.
    // Assim, terei acesso ao email via payload.email
    const payload = jwt.verify(token, secret);
    const user = await usersModel.getUserByMail(payload.email);
    // injeto o valor do usuário, após a validação via middware.
    req.user = user;
    next();
  } catch (_e) {
    return res.status(HTTPStatus.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
