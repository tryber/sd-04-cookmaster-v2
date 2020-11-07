const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  
  const user = await userModel.register(name, email, password, role);

  return res.status(201).json(user);
};

module.exports = {
  register,
};
