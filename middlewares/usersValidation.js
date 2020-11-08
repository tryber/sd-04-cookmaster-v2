const usersModel = require('../models/usersModel');
const resp = require('../errorMsgs');

const fieldNameIsValid = ({ name }) =>
  (name ? true : false);

const fieldEmailIsValid = async ({ email }) => {
  const re = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (!re.test(email)) return false;

  const user = await usersModel.readByEmail(email);

  if (user) return false;

  return true;
};

const fieldPasswordIsValid = ({ password }) =>
  (password ? true : false);

const createUserVal = async (req, res, next) => {
  const user = req.body;

  if (!(fieldNameIsValid(user) && await fieldEmailIsValid(user) && fieldPasswordIsValid(user))) {
    return resp(res, 400, 1);
  }

  next();
};

// (async () => console.log(await fieldEmailIsValid('erickjacqui@gmail.com')))()

module.exports = {
  createUserVal,
};
