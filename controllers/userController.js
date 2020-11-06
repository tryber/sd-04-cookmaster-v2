const userModel = require('../models/userModel');
const createToken = require('../auth/createToken');

const createUserController = async (req, res) => {
  try {
    let role = 'user';
    const { name, email, password } = req.body;
    if (req.body.role) role = req.body.role;
    const user = await userModel.createUser(name, email, password, role);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    const { password: _, ...userData } = user;
    const token = createToken(userData);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUserController,
  loginController,
};
