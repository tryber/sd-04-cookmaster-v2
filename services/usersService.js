const usersModel = require('../models/usersModel');

const createOne = async (name, email, password) => {
  const role = 'user';
  const newUser = await usersModel.add(name, email, password, role);
  return newUser;
};

const readAll = async () => {
  const users = await usersModel.getAll();
  return users;
};

const readByEmail = async (email) => {
  const user = await usersModel.getByEmail(email);
  return user;
};

module.exports = {
  createOne,
  readAll,
  readByEmail,
};
