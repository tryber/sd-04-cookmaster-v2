const express = require('express');
const usersModel = require('../models/usersModel');
const validateToken = require('../middlewares/auth/validateToken');
const { HTTPStatus } = require('../services/httpStatus');
const { signUpValidation } = require('../middlewares/loginValidations');
const validAdmin = require('../middlewares/validAdmin');

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

router.post('/admin',
  validateToken,
  validAdmin,
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await usersModel.addAdmin(name, email, password);
    return res.status(HTTPStatus.CREATED).json({ user });
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
