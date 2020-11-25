const userModel = require('../models/userModel');

const isAlreadyEmail = async (email) => {
  const response = await userModel.findUserByEmail(email);
  if (response) return true;
  return false;
};

const isInvalidLogin = async (userEmail, userPass) => {
  const response = await userModel.findUserByEmail(userEmail);
  if (!response) return true;
  const { password } = response;
  if (userPass !== password) return true;
  return false;
};

module.exports = {
  isAlreadyEmail,
  isInvalidLogin,
};
