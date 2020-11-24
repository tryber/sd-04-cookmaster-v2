const express = require('express');
const { userService } = require('../service');
const { userModel } = require('../model');

const router = express.Router();

router.post('/', userService.createUser, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.addUser(name, email, password, 'user');
  return res.status(201).json(user);
});

module.exports = router;
