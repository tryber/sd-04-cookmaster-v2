const authCreate = require('../auth/createToken');
const authValidate = require('../auth/validateToken');

const tokenCreation = (req, _, next) => {
  const { name, ...data } = req.data;
  const token = authCreate.createToken(data);
  req.headers.authorization = token;
  next();
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  const check = authValidate.validateToken(token);
  if (!check) {
    return res.status(203).json({ message: 'usuário não autorizado' });
  }
  next();
};

module.exports = {
  tokenCreation,
  tokenValidation,
};
