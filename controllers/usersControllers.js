const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const add = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const testRegex = emailRegex.test(email);
    if (!name || !email || !password || !testRegex) {
      return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }
    const findUserEmail = await usersModel.findByEmail(email);
    if (findUserEmail) {
      return res.status(409).send({ message: 'Email already registered' });
    }
    const role = 'user';
    const user = await usersModel.add(name, email, password, role);
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(400).send({ message: 'Algo deu errado ao tentar cadastrar usuário' });
  }
};

const login = async (req, res) => {
  const secret = 'secrecttoken';
  const jwtConfig = {
    expiresIn: '5h',
    algorithm: 'HS256',
  };
  try {
    const { email, password } = req.body;
    const user = await usersModel.findByEmail(email);
    if (!email || !password) {
      return res.status(401).send({ message: 'All fields must be filled' });
    }
    if (!user || password !== user.password) {
      return res.status(401).send({ message: 'Incorrect username or password' });
    }
    const jwtData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign({ data: jwtData }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(400).send({ message: 'Algo deu errado ao tentar fazer o login' });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { role } = req.user;
    const { name, email, password } = req.body;
    if (role !== 'admin') {
      return res.status(403).send({ message: 'Only admins can register new admins' });
    }
    if (!name || !email || !password) {
      return res.status(403).send({ message: 'Invalid entries. Try again.' });
    }
    const user = await usersModel.add(name, email, password, role);
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(403).send({ message: 'Only admins can register new admins' });
  }
};

module.exports = {
  add,
  login,
  addAdmin,
};
