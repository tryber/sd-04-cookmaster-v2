const { errorsMessages } = require('../service');

const emailValidator = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const validCreateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  switch (true) {
    case !name:
    case !email:
    case !password:
    case !emailValidator.test(email):
      errorsMessages(res, 'Invalid entries. Try again.', 'bad_request');
      break;
    default:
      next();
  }
};

// const emailValidator = async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     const existOrNotProduct = await productModels.getProdByName(name);
//     if (existOrNotProduct) {
//       return errorsMessages(res, 'Product already exists', 'invalid_data');
//     }
//     next();
//   } catch (err) {
//     console.error('validationExistProd', err);
//   }
// };

module.exports = { validCreateUser };
