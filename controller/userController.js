const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!email || !password || !name || validaEmail === false) return userServices.invalideEntries(res);

  const emailValid = await userModel.findByEmailOne(email);
  if (emailValid) return userServices.alreadyExistEmail(res);

  const role = 'user';
  const user = await userModel.registerUser(name, email, password, role);
  res.status(201).json({ user });
};

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return userServices.emptyFields(res);

    const user = await userModel.findByEmailOne(email);
    if (!user || user.password !== password) return userServices.incorrectEmailOrPassword(res);

    const secret = 'user';
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error', error: err });
  }
};

module.exports = {
  register,
  login,
};
