const { userModel } = require('../model');

const isValid = async (name, email, password) => {
  const err = { message: '' };
  const emailRegex = /\S+@\S+\.\S+/;

  if (!name || !email || !password) err.message = 'Invalid entries. Try again.';
  if (!emailRegex.test(email)) err.message = 'Invalid entries. Try again.';
  if (await userModel.getUserByEmail(email)) err.message = 'Email already registered';

  return err;
};

const createUser = async (name, email, password) => {
  const err = await isValid(name, email, password);
  if (err.message.length === 27) return { err, status: 400, error: true };
  if (err.message.length === 24) return { err, status: 409, error: true };

  const newUser = await userModel.createUser(name, email, password);
  return { user: { name, email, role: 'user', _id: newUser.insertedId } };
};

module.exports = {
  createUser,
};
