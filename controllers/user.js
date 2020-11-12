const express = require('express');
const validate = require('../middlewares/validation');
const userModel = require('../models/user');

const router = express.Router();

router.post('/', validate.fields, validate.emailUnique, validate.email, async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const user = await userModel.add('users', { name, email, password, role });

    res.status(201).json({ user });
  } catch (_e) {
    res.status(501).json({ message: 'Failed to register user!' });
  }
});

module.exports = router;
