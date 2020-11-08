const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const fieldNameIsValid = ({ name }) =>
  name || false;

const fieldEmailIsValid = async (res, { email }) => {
  const re = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (!re.test(email)) return false;

  const user = await usersModel.readByEmail(email);

  if (user) return resp(res, 409, 2);

  return true;
};

const fieldPasswordIsValid = ({ password }) =>
  password || false;

const createUserVal = async (req, res, next) => {
  const user = req.body;

  if (!(fieldNameIsValid(user) && fieldPasswordIsValid(user))) return resp(res, 400, 1);
  if (!(await fieldEmailIsValid(res, user))) return resp(res, 400, 1);

  next();
};

// (async () => console.log(await fieldEmailIsValid('erickjacqui@gmail.com')))()

module.exports = {
  createUserVal,
};
