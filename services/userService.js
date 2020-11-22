const { createToken } = require('./createToken');
const userModel = require('../models/genericModel');

const loginService = async ({ email, password }) => {
  const user = await userModel.findOne('users', { email });
  if (!user) {
    return { message: 'Incorrect username or password' };
  }
  if (user || user.password === password) {
    const token = createToken({ email });
    return token;
  }
};

const registerAdmin = async (name, email, password, user) => {
  const loggedUser = await userModel.findOne('users', { email: user.email });
  if (loggedUser.role !== 'admin') return { message: 'Only admins can register new admins' };
  const registeredUser = await userModel.createOne('users', {
    name,
    email,
    password,
    role: 'admin',
  });

  return registeredUser;
};

module.exports = { loginService, registerAdmin };
