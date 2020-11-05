// const validator = require('validator');
const usersModel = require('../models/usersModel');

const add = async (name, email, password) => {
  if (name && email && password) {
    const newUser = await usersModel.add(name, email, password);
    return newUser;
  }
  return null;
};

const getAll = async () => {
  const users = await usersModel.getAll();
  return users;
};

module.exports = {
  add,
  getAll,
};
