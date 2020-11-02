const userModel = require('../models/userModel');

const postUserController = async (req, res) => {
  try {
    let role = 'user';
    const { name, email, password } = req.body;
    if (req.body.role) role = req.body.role;
    const user = await userModel.addUser(name, email, password, role);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postUserController,
};
