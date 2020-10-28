// const RecipeModel = require('../models/recipeModel');

const responseMessage = (message) => ({ message });

// const validateEmailRegex = async (req, res, next) => {
//   const { email } = req.body;
//   const isEmailValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);
//   if (!isEmailValid) {
//     return res.status(400).json(responseMessage('Invalid entries. Try again.'));
//   }
//   next();
// };

module.exports = {
  responseMessage,
};
