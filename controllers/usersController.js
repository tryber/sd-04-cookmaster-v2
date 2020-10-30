const rescue = require('express-rescue');
const { postCreateUsersMod } = require('../models/usersModel');

const postCreateUsersCont = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await postCreateUsersMod(name, email, password);

  return res.status(201).json({ user: result });
});

module.exports = { postCreateUsersCont };
