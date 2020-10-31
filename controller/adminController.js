const adminModel = require('../models/userModel');

const registerAdmin = async (req, res) => {
  const { role } = req.user;
  const { name, email, password } = req.body;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const roleAdmin = 'admin';
  const user = await adminModel.registerUser(name, email, password, roleAdmin);

  res.status(201).json({ user });
};

module.exports = {
  registerAdmin,
};
