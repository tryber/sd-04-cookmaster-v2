const Joi = require('joi');
const userModel = require('../model/userModel');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
  role: Joi.string()
}).unknown(false);

const validaUser = async (req, res, next) => {
  const { body } = req;  
  const { error } = schema.validate(body);
  const emailBD = await userModel.getByEmail(body.email);

  if (emailBD.email === body.email) return res.status(409).json({message: "Email already registered"});
  if (error) return res.status(400).json({ message: "Invalid entries. Try again"});

  next();
}

module.exports =  {
  validaUser,
}
