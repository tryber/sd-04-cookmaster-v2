const rescue = require('express-rescue');
const { createToken } = require('../auth/jwt');
const { validateUser, validateLogin } = require('../middlewares');
const { addNew } = require('../models/genericModel');

const postNew = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await addNew('users', { name, email, password, role: 'user' });
  res.status(201).json({ user });
});

const login = (req, res) => {
  const token = createToken(req.user);
  res.json({ token });
};

module.exports = {
  postNew: [validateUser, postNew],
  login: [validateLogin, login],
};
