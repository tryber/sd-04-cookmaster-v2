const express = require('express');
// importando o validationUsers do Middleware
const validationUsers = require('../middlewares/validationUsers');
// importando o userModel do model
const userModel = require('../models/userModel');
// criando a rota
const router = express.Router();

const validations = [
  validationUsers.validationNameEmailPassword,
  validationUsers.invalidEmail,
  validationUsers.singleEmail,
]; // jogar todas as validações em uma variável

const messageJson = { message: 'Invalid entreies. Try again.' }; // jogar o json na variavel

router.post('/', validations, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.addUser(name, email, password);
    const { _id } = user;
    res.status(201).json({ user: { name, email, role: 'user', _id } });
  } catch (_e) {
    res.status(400).json(messageJson);
  }
});

module.exports = router;
