const rescue = require('express-rescue');
const { postCreateUsersMod, postCreateAdminMod } = require('../models/usersModel');

const postCreateUsersCont = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await postCreateUsersMod(name, email, password);

  return res.status(201).json({ user: result });
});

const postCreateAdminCont = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const result = await postCreateAdminMod(name, email, password);

  return res.status(201).json({ user: result });
});

module.exports = { postCreateUsersCont, postCreateAdminCont };
