const express = require('express');

const router = express.Router();

const { createUser, findUserByEmail } = require('../models/userModel');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await findUserByEmail(email);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (userEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = await createUser(name, email, password, 'user');
  return res.status(201).json({ user });
});

module.exports = router;
