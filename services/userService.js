const userModel = require('../models/userModel');
const generateToken = require('../middlewares/auth');

const validateEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const registerUser = async (name, email, password) => {
  if (!name || !email || !validateEmail.test(email) || !password) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const isEmailExists = await userModel.findUserByEmail(email);

  if (isEmailExists) {
    return { code: 'conflict', message: 'Email already registered' };
  }

  const user = await userModel.registerUser(name, email, password);

  return user;
};

const userLogin = async (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };
  const user = await userModel.findUserByEmail(email);

  if (!user || user.password !== password) return { message: 'Incorrect username or password' };

  const { password: _, ...userWithoutPassword } = user;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  registerUser,
  userLogin,
};
