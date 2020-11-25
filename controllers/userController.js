const express = require('express');
const validationUsers = require('../middlewares/validationUsers'); // importando o validationUsers do Middleware
const userModel = require('../models/userModel'); // importando o userModel do model
const router = express.Router(); // criando a rota

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
