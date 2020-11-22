const { userModel: { getUserByEmail, createUserModel } } = require('../models');
const createToken = require('../auth/createToken');

const createUser = async (name, email, password, role) => {
  const dbUser = await getUserByEmail(email);
  if (dbUser) return { message: 'Email already registered' };

  const user = await createUserModel(name, email, password, role);
  return { name, email, role, _id: user.insertedId };
};

const loginUser = async (email, password) => {
  const message = 'Incorrect username or password';
  const dbUser = await getUserByEmail(email);

  if (!dbUser) return { message };

  if (dbUser.password !== password) return { message };

  const { _id } = dbUser;

  const token = await createToken({
    userId: _id,
    email,
    password,
  });
  return { token };
};

module.exports = {
  createUser,
  loginUser,
};
