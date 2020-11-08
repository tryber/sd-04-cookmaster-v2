const Users = require('../models/userModel');

// VALIDAÇÃO E CRIAÇÃO DO USUÁRIO ------------------------------------------------------------
const isValid = async (name, email, password) => {
  const err = { message: '' };
  const emailRegex = /\S+@\S+\.\S+/;

  if (!name || !email || !password) err.message = 'Invalid entries. Try again.';
  if (!emailRegex.test(email)) err.message = 'Invalid entries. Try again.';
  if (await Users.getUserByEmail(email)) err.message = 'Email already registered';

  return err;
};

const createUser = async (name, email, password) => {
  const err = await isValid(name, email, password);
  if (err.message.length === 27) return { err, status: 400, error: true };
  if (err.message.length === 24) return { err, status: 409, error: true };

  const newUser = await Users.createUser(name, email, password);
  return { user: { name, email, role: 'user', _id: newUser.insertedId } };
};

// const createAdmin = async (name, email, password, userRole) => {
//   const err = { message: 'Only admins can register new admins' };
//   if (userRole !== 'admin') return { err, status: 403, error: true };

//   const newAdmin = await Users.createAdmin(name, email, password);
//   return { user: { name, email, role: 'admin', _id: newAdmin.insertedId } };
// };

module.exports = { createUser };
