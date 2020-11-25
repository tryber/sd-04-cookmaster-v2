const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'cookmaster-v2';

const generateToken = (data) => {
  const headers = { expiresIn: '1d', algorithm: 'HS256' };
  return jwt.sign(data, secret, headers);
};

const userRegister = async (user) => {
  const response = await userModel.userInsert(user);
  return response;
};

const userLogin = async (userEmail) => {
  const response = await userModel.findUserByEmail(userEmail);
  const { _id, passwod, role, ...Data } = response;
  return generateToken(Data);
};

module.exports = {
  userRegister,
  userLogin,
};
