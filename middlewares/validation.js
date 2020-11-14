const modelUser = require('../models/user');
const model = require('../models/user');

const createMessage = (message) => ({ message });

const fields = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(createMessage('Invalid entries. Try again.'));
  }

  next();
};

const emailUnique = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await modelUser.findByEmail('users', email);

  if (emailExists) {
    return res.status(409).json(createMessage('Email already registered'));
  }

  next();
};

const email = async (req, res, next) => {
  const { email: emailBody } = req.body;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(emailBody)) {
    return res.status(400).json(createMessage('Invalid entries. Try again.'));
  }

  next();
};

const loginFields = async (req, res, next) => {
  const { email: emailBody, password } = req.body;

  if (!emailBody || !password) {
    return res.status(401).json(createMessage('All fields must be filled'));
  }

  next();
};

const login = async (req, res, next) => {
  const { email: emailBody, password } = req.body;

  const user = await modelUser.findByEmail('users', emailBody);

  if (!user || password !== user.password) {
    return res.status(401).json(createMessage('Incorrect username or password'));
  }

  const { password: _, name: _name, ...userWithNoPassword } = user;
  req.user = userWithNoPassword;

  next();
};

const recipeExists = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await model.findById('recipes', id);

  if (!recipe) return res.status(404).json(createMessage('recipe not found'));

  req.recipe = recipe;

  next();
};

const recipeFields = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json(createMessage('Invalid entries. Try again.'));
  }

  next();
};

module.exports = {
  fields,
  email,
  emailUnique,
  loginFields,
  login,
  recipeExists,
  recipeFields,
};
