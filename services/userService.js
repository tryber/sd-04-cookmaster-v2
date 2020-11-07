const userModel = require('../models/userModel');
const { generateToken } = require('../middlewares/auth');

const validateEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validateFields = (name, email, password) => {
  if (!name || !email || !validateEmail.test(email) || !password) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }
  return true;
}

const registerUser = async (name, email, password) => {
  const validate = validateFields(name, email, password);
  if (validate.code === 'invalid_data') return validate;

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

  return generateToken(user);
};

const registerAdmin = async (name, email, password, user) => {
  const validate = validateFields(name, email, password);
  if (validate.code === 'invalid_data') return validate;

  const loggedUser = await userModel.findUserByEmail(user.email);
  if (loggedUser.role !== 'admin') return { message: 'Only admins can register new admins' };
  const user = await userModel.registerUser(name, email, password, 'admin');

  return user;
}

module.exports = {
  registerUser,
  userLogin,
  registerAdmin,
};
