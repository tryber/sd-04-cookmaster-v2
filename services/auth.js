const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const authUser = (req, res, next) => {
  const secret = 'secrecttoken';
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findByEmail(decoded.padStart.email);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};

module.exports = authUser;
