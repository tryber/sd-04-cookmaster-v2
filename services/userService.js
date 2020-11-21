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

module.exports = { loginService };
