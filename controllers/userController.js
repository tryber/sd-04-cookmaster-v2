const userModel = require('../models/userModel');
const validate = require('../middlewares/userValidation');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.addUser(name, email, password);

    return res.status(201).json({ user });
  } catch (_err) {
    res.status(500).json({ message: 'Error in controller register' });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;

    const token = await validate.backToken(email);

    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error in controller login', err });
  }
};

module.exports = { register, login };
