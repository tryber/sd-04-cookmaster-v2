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
    const correctPassword = (await userExistByEmail.password) === password;

    if (!userExistByEmail || !correctPassword) {
      return res.status(401).json(LoginValidator.responseMessage('Incorrect username or password'));
    }

    const token2 = createNewJWT(userExistByEmail);

    const jwtConfig = {
      expiresIn: '14d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: userExistByEmail }, secret, jwtConfig);

    console.log(token);

    console.log('linha 39', req.body);

    return res.status(200).json({ token2 });
  } catch (err) {
    console.log('rota login', err);
    res.status(400).json({ message: 'something gone wrong on login' });
  }
});

module.exports = router;
