const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const fieldEmailIsValid = (email) => {
  const re = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (re.test(email)) return true;

  return false;
};

const fieldPwdIsValid = (pwd) =>
  pwd || false;

module.exports = async (req, res, next) => {
  const { email, password: pwd } = req.body;

  if (!(fieldEmailIsValid(email) && fieldPwdIsValid(pwd))) return resp(res, 401, 3);

  const user = await usersModel.readByEmailPwd(email, pwd);

  if (!user) return resp(res, 401, 4);

  req.user = user;

  next();
};
