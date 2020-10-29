const express = require('express');
const userModel = require('../model/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.cadUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro user get', error);
  }
});

module.exports = router;
