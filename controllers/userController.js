const rescue = require('express-rescue');
const userService = require('../services/userService');

const registerUser = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userService.registerUser(name, email, password);

  if (user.message && user.code === 'conflict') {
    return res.status(409).json({ message: user.message });
  }

  if (user.message) {
    return res.status(400).json({ message: user.message });
  }

  return res.status(201).json(user);
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.userLogin(email, password);

  if (user.message) {
    return res.status(401).json(user);
  }

  return res.status(200).json(user);
});

module.exports = {
  registerUser,
  userLogin,
};
