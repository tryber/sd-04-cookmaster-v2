const UserModel = require('../models/userModel');
const UserServices = require('../services/usersServices');

// CRIA NOVO USUÁRIO---------------------------------------------------------------------
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserServices.createUser(name, email, password);

  if (newUser.error) return res.status(newUser.status).json(newUser.err);
  return res.status(201).json(newUser);
};

// CRIA NOVO ADMIN---------------------------------------------------------------------
const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const userRole = req.user.role;

  if (userRole === 'admin') {
    const newAdmin = await UserModel.createAdmin(name, email, password);
    const newAdminReturn = {
      user: { name, email, password, role: 'admin', _id: newAdmin.insertedId },
    };
    return res.status(201).json(newAdminReturn);
  }
  return res.status(403).json({ message: 'Only admins can register new admins' });
};

module.exports = { createUser, createAdmin };
