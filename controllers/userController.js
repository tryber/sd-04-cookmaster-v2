const userService = require('../services/userService');
const userModel = require('../models/genericModel');

const cadastro = async (req, res) => {
  const { name, email, password } = req.body;
  const create = await userModel.createOne('users', { name, email, password, role: 'user' });
  if (create.err) throw create.err;
  res.status(201).json({ user: create });
};

const login = async (req, res) => {
  const { name, email } = req.body;
  const token = await userService.loginService({ name, email });
  if (!token) throw new Error('token nao criado');
  if (typeof token === 'string') res.status(200).json({ token });
  else res.status(401).json(token);
};

module.exports = { cadastro, login };
