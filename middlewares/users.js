const usersModel = require('../models/usersModel');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await usersModel.create(name, email, password, 'user');

  res.status(201).json({ user: newUser });
};

module.exports = {
  createUser,
};
