const rescue = require('express-rescue');
const { createToken } = require('../auth/jwt');
const { ONLY_ADMINS } = require('../errors');
const { validateUser, validateLogin, validateToken } = require('../middlewares');
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

const postNewAdmin = rescue(async (req, res) => {
  if (req.user.role !== 'admin') throw ONLY_ADMINS;
  const { name, email, password } = req.body;
  const user = await addNew('users', { name, email, password, role: 'admin' });
  res.status(201).json({ user });
});

module.exports = {
  postNewAdmin: [validateUser, validateToken, postNewAdmin],
  postNew: [validateUser, postNew],
  login: [validateLogin, login],
};
