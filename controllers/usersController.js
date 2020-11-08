const userModel = require('../models/usersModel');
const { schemaAdd } = require('../service/validador');

const addUser = async (data, res) => {
  const userAdd = await userModel.addUser(data);
  const { password: _, ...userS } = userAdd;
  return res.status(201).json({ user: userS });
};

// validar dados da req e adicionar usuario
const addUserController = async (req, res) => {
  const { body } = req;
  if (!body.role) body.role = 'user';
  try {
    await schemaAdd.validate(body);
    const checkEmail = await userModel.getUserByEmail(body.email);
    if (!checkEmail) {
      return addUser(body, res);
    }
    return res.status(409).json({ message: 'Email already registered' });
  } catch (erro) {
    return res.status(400).json({ message: `${erro.errors[0]}` });
  }
};

const addUserAdmin = async (req, res) => {
  const { body } = req;
  if (!body.role) body.role = 'admin';
  const { role } = req.user;
  if (role === 'admin') {
    return addUser(body, res);
  }
  return res.status(403).json({ message: 'Only admins can register new admins' });
};

module.exports = {
  addUserController,
  addUserAdmin,
};
