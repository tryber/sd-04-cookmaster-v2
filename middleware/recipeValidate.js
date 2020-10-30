const Joi = require('joi');

const recipeCadastro = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required()
}).unknown(false);

const validaReceita = (req, res, next) => {
  const { body } = req;
  const { error } = recipeCadastro.validate(body);

  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.'});
  }

  next();
}

module.exports = {
  validaReceita,
}