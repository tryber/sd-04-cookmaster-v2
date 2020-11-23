const express = require('express');
const validate = require('../middlewares/validations');
const { validateToken, verifyToken } = require('../authentication');
const { create } = require('../models/crud');

const router = express.Router();

router.post('/', validate.fields, validate.emailUnique, validate.email, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const user = await create('users', { name, email, password, role });

    res.status(201).json({ user });
  } catch (_e) {
    res.status(501).json({ message: 'Failed to register user!' });
  }
});

router.post('/admin', validateToken(true), verifyToken, async (req, res) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  try {
    const { name, email, password } = req.body;
    const user = await create('users', { name, email, password, role });

    res.status(201).json({ user });
  } catch (_e) {
    res.status(501).json({ message: 'Failed to register admin!' });
  }
});

module.exports = router;
