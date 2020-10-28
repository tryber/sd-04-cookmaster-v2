const usersModel = require('../models/usersModel');

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
    const user = await usersModel.add(name, email, password);
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(400).send({ message: 'Algo deu errado ao tentar cadastrar usuário' });
  }
};

module.exports = {
  add,
};
