const express = require('express');
const usersModel = require('../models/usersModel');
const HTTPStatus = require('../services/httpStatus');

const router = express.Router();

// Mostrar todos os usuários
router.get('/', async (_req, res) => {
  try {
    const allUser = await usersModel.getAllUsers();
    return res.status(HTTPStatus.OK).json(allUser);
  } catch (_e) {
    return res.status(HTTPStatus.INTERNAL_ERROR);
  }
});

// Cadastro de usuário
router.post('/', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const newUser = await usersModel.addUser(email, password, name, role);

    return res.status(HTTPStatus.CREATED).json(newUser);
  } catch (_err) {
    return res.status(HTTPStatus.BAD_REQUEST);
  }
});

module.exports = router;
