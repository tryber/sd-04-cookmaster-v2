const usersModel = require('../models/userModel');

const insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role: userRole } = req.user;
    const insertedUser = await usersModel.insertUser(name, email, password, userRole);
    res.status(201).json({ user: insertedUser });
  } catch (_err) {
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  insertUser,
};
