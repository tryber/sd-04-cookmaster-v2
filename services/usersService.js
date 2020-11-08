const usersModel = require('../models/usersModel');

const add = async (name, email, password) => {
  const role = 'user';
  const newUser = await usersModel.add(name, email, password, role);
  return newUser;
};

const getAll = async () => {
  const users = await usersModel.getAll();
  return users;
};

const getByEmail = async (email) => {
  const user = await usersModel.getByEmail(email);
  return user;
};

module.exports = {
  add,
  getAll,
  getByEmail,
};
