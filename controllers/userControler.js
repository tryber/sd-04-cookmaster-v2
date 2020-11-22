const express = require('express');
const { userService } = require('../service');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  // console.log('oi');
  const newUser = await userService.createUser(name, email, password);

  if (newUser.error) return res.status(newUser.status).json(newUser.message);
  return res.status(201).json(newUser);
});

module.exports = router;
