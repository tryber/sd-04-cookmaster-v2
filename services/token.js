const model = require('../models/login');
const authCreate = require('../auth/createToken');
const authValidate = require('../auth/validateToken');

const tokenCreation = async (req, _, next) => {
  const { name, ...data } = req.data;
  const token = authCreate.createToken(data);
  await model.createToken(token);
  next();
};

const tokenValidation = async (_, res, next) => {
  const token = await model.checkToken();
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
