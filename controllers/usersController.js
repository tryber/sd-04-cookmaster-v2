const rescue = require('express-rescue');
const { createToken } = require('../auth/jwt');
const validate = require('../middlewares/validateUser');
const { addNew } = require('../models/genericModel');

const postNew = rescue(async ({ body: { name, email, password } }, res) => {
  const user = await addNew('users', { name, email, password, role: 'user' });
  res.status(201).json({ user });
});

const login = rescue(async ({ body: { email, password } }, res) => {
  const token = createToken({ email, password });
  res.json({ token });
});

module.exports = {
  postNew: [validate('user'), postNew],
  login: [validate('login'), login],
};
