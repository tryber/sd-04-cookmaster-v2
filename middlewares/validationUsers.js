// importando o useModel
const messageJson = { message: 'Invalid entries. Try again.' }; // jogar o json na variavel

const userModel = require('../models/userModel'); // importando o userModel
const messageEmailJson = { message: 'Email already registered' }; // jogar o json na variavel
const validator = require('validator'); // biblioteca de validação de email

// verifica se name, email e password existe
const validationNameEmailPassword = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json(messageJson);
  }
  next();
};
// verifica se o email é valido, se sua entrada segue o padrão de email
const invalidEmail = (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json(messageJson);
  }
  next();
};

// verifica se o email é único, não repetitivo
const singleEmail = async (req, res, next) => {
  const { email } = req.body;
  const emails = await userModel.findEmail(email);
  if (emails) {
    return res.status(409).json(messageEmailJson);
  }
  next();
};

module.exports = { validationNameEmailPassword, invalidEmail, singleEmail };
