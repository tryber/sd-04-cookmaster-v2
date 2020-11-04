const userModel = require('../models/userModel');
const { createToken } = require('../middlewares/createToken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const user = await userModel.registerUser(name, email, password, role);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao cadastrar usuário' });
  }
};

const loginUser = (req, res) => {
  try {
    const { password: _, ...userWithoutPassword } = req.user;

    const token = createToken(userWithoutPassword);
    res.status(200).json(token);
  } catch (error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao logar usuário' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
