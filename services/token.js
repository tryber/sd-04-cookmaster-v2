const model = require('../models/login');
const authCreate = require('../auth/createToken');
const authValidate = require('../auth/validateToken');

const tokenCreation = async (req, _, next) => {
  const { name, ...data } = req.data;
  const token = authCreate.createToken(data);
  await model.createToken(token, data.email);
  next();
};

const tokenValidation = async (_, res, next) => {
  const data = await model.checkToken();
  const check = authValidate.validateToken(data.token);
  if (!check) {
    return res.status(404).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = {
  tokenCreation,
  tokenValidation,
};
