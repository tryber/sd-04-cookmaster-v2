const model = require('../models/model');

const buildResponse = (message) => {
  const resp = { message };
  return resp;
};

// os campos "name", "email" e "password" são obrigatórios
const validateFields = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  next();
};

// não é possível cadastrar usuário com o campo email inválido
const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    return res.status(400).json(buildResponse('Invalid entries. Try again.'));
  }

  next();
};

// o campo "email" deve ser único
const validateEmailIsUnique = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await model.findByEmail('users', email);

  if (emailExists) {
    return res.status(409).json(buildResponse('Email already registered'));
  }

  next();
};

module.exports = {
  validateFields,
  validateEmail,
  validateEmailIsUnique,
};
