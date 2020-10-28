const UserServices = require('../services/usersServices');

// CRIA NOVO USUÁRIO---------------------------------------------------------------------
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserServices.createUser(name, email, password);

  if (newUser.error) return res.status(newUser.status).json(newUser.err);
  return res.status(201).json(newUser);
};

module.exports = { createUser };
