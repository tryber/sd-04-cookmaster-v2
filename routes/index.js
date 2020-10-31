const usersRouter = require('./usersRouter');
const recipesRouter = require('./recipesRouter');
const loginRouter = require('./loginRouter');

module.exports = {
  users: usersRouter,
  recipes: recipesRouter,
  login: loginRouter,
};
