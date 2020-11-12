const modelUser = require('../models/user');

const message = (message) => ({ message });

const fields = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(message('Invalid entries. Try again.'));
  }

  next();
};

const emailUnique = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await modelUser.findByEmail('users', email);

  if (emailExists) {
    return res.status(409).json(message('Email already registered'));
  }

  next();
};

const email = async (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    return res.status(400).json(message('Invalid entries. Try again.'));
  }

  next();
};

module.exports = {
  fields,
  email,
  emailUnique,
};
