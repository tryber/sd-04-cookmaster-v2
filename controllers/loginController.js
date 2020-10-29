const express = require('express');

const jwt = require('jsonwebtoken');

const createNewJWT = require('../authentication/createJWT');

const LoginValidator = require('../middlewares/loginValidator');

const router = express.Router();

const UserModel = require('../models/userModel');

const secret = 'segredotoken';

// ROTA LOGIN

router.post('/', LoginValidator.validateEmailAndPasswordLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExistByEmail = await UserModel.getUserByEmail(email);

    if (userExistByEmail) {
      const correctPassword = (await userExistByEmail.password) === password;
      if (!correctPassword) {
        return res
          .status(401)
          .json(LoginValidator.responseMessage('Incorrect username or password'));
      }
    }

    if (!userExistByEmail) {
      return res.status(401).json(LoginValidator.responseMessage('Incorrect username or password'));
    }

    const token2 = createNewJWT(userExistByEmail);

    console.log('linha 37, loginController, token: ', token2);

    console.log('linha 39, loginController, req.body: ', req.body);

    return res.status(200).json({ token2 });
  } catch (err) {
    console.log('rota login, erro: \n', err);
    res.status(401).json({ message: 'something gone wrong on login' });
  }
});

module.exports = router;
