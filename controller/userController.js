const userModel = require('../models/userModel');
const userServices = require('../services/userServices');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!email || !password || !name || validaEmail === false) {
    return userServices.invalideEntries(res);
  }

  const emailValid = await userModel.findByEmail(email);

  if (emailValid.length !== 0) {
    return userServices.alreadyExistEmail(res);
  }

  const role = 'user';

  const user = await userModel.registerUser(name, email, password, role);
  res.status(201).json({ user });
};

module.exports = {
  register,
};
