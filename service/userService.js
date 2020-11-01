const errorsMessages = require('./errorsMessages');
const { userModels } = require('../model');


const validCreateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailValid = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!name || !email || !password || !emailValid.test(email)) {
    return errorsMessages(res, 'Invalid entries. Try again.', 'bad_request');
  }
  next();
};

const emailValidator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existOrNotEmail = await userModels.getByEmailModel(email);
    if (existOrNotEmail) {
      return errorsMessages(res, 'Email already registered', 'conflict');
    }
    next();
  } catch (err) {
    console.error('validationExistProd', err.message);
  }
};

module.exports = {
  validCreateUser,
  emailValidator,
};
