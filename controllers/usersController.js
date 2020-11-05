const express = require('express');
const usersService = require('../services/usersService');

const router = express.Router();

router
  .get('/', async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json({ users });
  })
  .post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await usersService.add(name, email, password);
    if (!user) {
      return res.status(400).json({ wrong: 'nope' });
    }
    return res.json({ user });
  });

module.exports = router;
