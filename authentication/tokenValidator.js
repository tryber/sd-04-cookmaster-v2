const jwt = require('jsonwebtoken');

const loginValidator = require('../middlewares/loginValidator');

const UserModel = require('../models/userModel');

const secret = 'Cookmaster';

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json(loginValidator.responseMessage('missing auth token'));

  try {
    const tokenValid = jwt.verify(token, secret);

    console.log('linha 12, tokenValidator, tokenValid', tokenValid);

    const user = await UserModel.getUserByEmail(tokenValid.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
    }

    if (!tokenValid) {
      return res.status(401).json({ message: 'Token not valid' });
    }

    req.user = user;

    req.body = { ...req.body, tokenValid };

    next();
  } catch (err) {
    console.log('linha ', err);
    return res.status(401).json(loginValidator.responseMessage('jwt malformed'));
  }
};

module.exports = tokenValidator;
