const userModel = require('../models/userModel');
const userServices = require('../services/userServices');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  userServices.isValid(name, email, password, res);
  userServices.verifyDuplicated(email, res);

  const role = 'user';

  const user = await userModel.registerUser(name, email, password, role);
  delete user.password;
  res.status(201).json({ user });
};

module.exports = {
  register,
};
