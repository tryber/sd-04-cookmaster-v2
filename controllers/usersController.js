const express = require('express');
const usersModel = require('../models/usersModel');
const { HTTPStatus } = require('../services/httpStatus');
const { signUpValidation } = require('../middlewares/loginValidations');

const router = express.Router();

// Mostra todos os usuários no metodo GET endpoint: http://localhost:3000/users/
router.get('/', async (_req, res) => {
  try {
    const allUser = await usersModel.getAllUsers();
    return res.status(HTTPStatus.OK).json(allUser);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.INTERNAL_ERROR);
  }
});

// Cadastra um usuário no metodo POST endpoint: http://localhost:3000/users/
router.post('/',
  signUpValidation,
  async (req, res) => {
    try {
      const { email, password, name } = req.body;

      // req.body.role injetado diretamente no addUser, com valor 'user'.
      const user = await usersModel.addUser(email, password, name);
      return res.status(HTTPStatus.CREATED).json({ user });
    } catch (_err) {
      return res.status(HTTPStatus.BAD_REQUEST);
    }
  });

module.exports = router;
