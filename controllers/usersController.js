const express = require('express');
const userValidator = require('../middlewares/userValidation');
const usersService = require('../services/usersService');

const router = express.Router();

router
  .get('/', async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json({ users });
  })
  .post('/', userValidator, async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await usersService.getByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const user = await usersService.add(name, email, password);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      return res.status(201).json({ user });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

module.exports = router;
