const userModel = require('../models/userModel');

const cadastro = async (req, res) => {
  const { name, email, password } = req.body;
  const create = await userModel.createOne('users', { name, email, password, role: 'user' });
  if (create.err) throw create.err;
  res.status(201).json({ user: create });
};

module.exports = { cadastro };
