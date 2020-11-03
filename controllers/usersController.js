const express = require('express');
const usersModel = require('../models/usersModel');
const validate = require('../middlewares/middleValidateUser');
const validateAuth = require('../middlewares/middleAuthentication');
const creatToken = require('../authorization/createToken');
const validateToken = require('../middlewares/middleValidateToken');

const router = express.Router();

// POST /users
router.post('/users', validate.validateUser, validate.validateExistEmail, async (req, res) => {
  try {
    const role = 'user';
    const { name, email, password } = req.body;
    const user = await usersModel.add(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(501).json({ message: 'Falha ao cadastrar usuário.' });
  }
});

// POST /login
router.post('/login', validateAuth.userAuthentication, (req, res) => {
  try {
    const { id, email, role } = req.user;
    const token = creatToken({ id, email, role });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

// PUT  /user
// router.put('/users', validateToken.validationToken, (req, res) => {
//   console.log('put');
//   console.log('user' + req.user.email);
// const { email } = req.user;

// res.json({ message: 'Atualizar Usuário.' + email });
// });

module.exports = router;
