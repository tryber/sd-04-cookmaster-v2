const jwt = require('jsonwebtoken');

const { findByEmail } = require('../models/userModel');

const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = findByEmail(decode.data.email);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token' });
    }
    req.user = user;
    return next();
  } catch (err) {}
  console.error(err);
  return res.status(401).json({ message: 'Erro: Seu token é invalido' });
};
