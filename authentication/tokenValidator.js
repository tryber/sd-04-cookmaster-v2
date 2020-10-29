const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');

const secret = 'Cookmaster';

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;

  const tokenValid = jwt.verify(token, secret);

  const user = await UserModel.getUserByEmail(tokenValid.padStart.email);

  if (!user) {
    return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
  }

  if (!tokenValid) {
    return res.status(401).json({ message: 'Token not valid' });
  }

  req.user = user;

  req.body = { ...req.body, tokenValid };

  next();
};

module.exports = tokenValidator;
