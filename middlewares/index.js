const userMiddlewares = require('./userMiddlewares');
const recipeMiddlewares = require('./recipeMiddlewares');
const tokenAuth = require('./tokenAuth');

module.exports = {
  userMiddlewares,
  recipeMiddlewares,
  tokenAuth,
};
