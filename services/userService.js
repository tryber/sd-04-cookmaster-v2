const { userModel } = require('../models');

const createUser = async (name, email, password, role) => {
  const dbUser = await userModel.getUserByEmail(email);
  if (dbUser) return { message: 'Email already registered' };

  const user = await userModel.createUserModel(name, email, password, role);
  return { name, email, role, _id: user.insertedId };
};

module.exports = {
  createUser,
};
