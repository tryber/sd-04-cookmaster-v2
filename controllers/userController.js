const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';

  const user = userModel.register(name, email, password, role);
  res.statu(201).json({ user });
};

const updateUserPage = async (req, res) => {
  res.render('admin/editUser', { user: req.user, message: null });
};

const updateUser = async (req, res) => {
  const data = req.body;

  userModel.updateUser(req.user.id, data);
  return res.redirect('/');
};

module.exports = {
  register,
  updateUserPage,
  updateUser,
};
