const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const fieldNameIsValid = (name) =>
  name || false;

const fieldEmailIsValid = (email) => {
  const re = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (re.test(email)) return true;

  return false;
};

const fieldPwdIsValid = (pwd) =>
  pwd || false;

const userExist = async (email) => {
  const user = await usersModel.readByEmailPwd(email);

  if (user) return true;

  return false;
};

module.exports = async (req, res, next) => {
  const { name, email, password: pwd } = req.body;

  if (!(fieldNameIsValid(name) && fieldEmailIsValid(email) && fieldPwdIsValid(pwd))) {
    return resp(res, 400, 1);
  }
  if (await userExist(email)) return resp(res, 409, 2);

  next();
};
