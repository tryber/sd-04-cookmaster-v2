const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';

  const user = userModel.register(name, email, password, role);
  res.statu(201).json({ user });
};

module.exports = {
  register,
  updateUserPage,
  updateUser,
};
