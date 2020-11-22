const { userModel } = require('../model');

const createUser = async (name, email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!name || !email || !password || !emailRegex.test(email)) {
    return { status: 400, message: 'Invalid entries. Try again.', error: true };
  }
  if (await userModel.findByEmail(email)) {
    return { status: 409, message: 'Email already registered', error: true };
  }

  const newUser = await userModel.addUser(name, email, password);
  return newUser;
};

module.exports = {
  createUser,
};
