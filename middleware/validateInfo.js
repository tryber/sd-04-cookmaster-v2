const { loginSchema, userSchema, recipeSchema } = require('../schema/schema');

const checkUser = async (user) => userSchema.validate(user);
const checkLogin = async (user) => loginSchema.validate(user);
const checkRecipe = async (recipe) => recipeSchema.validate(recipe);

const userErrorDealer = async (req, res, next) => {
  try {
    await checkUser(req.body);
    next();
  } catch (er) {
    console.log(er);
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
};

const loginErrorDealer = async (req, res, next) => {
  try {
    await checkLogin(req.body);
    next();
  } catch (er) {
    console.log(er);
    res.status(401).json({ message: 'All fields must be filled' });
  }
};

const recipeErrorDealer = async (req, res, next) => {
  try {
    await checkRecipe(req.body);
    next();
  } catch (er) {
    console.log(er);
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
};

module.exports = { userErrorDealer, loginErrorDealer, recipeErrorDealer };
