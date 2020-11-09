const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'opaopaopa!';

const isValidUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!name || !email || !password || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const exist = await userModel.findByEmail(email);

  if (exist) return res.status(409).json({ message: 'Email already registered' });

  next();
};

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'no toke informed' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findByEmail(payload.useremail);

    if (!user) return res.status(401).json({ message: 'user not found' });

    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  isValidUser,
  authentication,
};
