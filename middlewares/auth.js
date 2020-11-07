const { findByEmail } = require("../models/userModel");
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'opaopaopa!';

const isValidUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const exist = await findByEmail(email);

  if (!name || !email || !password || emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (exist.length > 0) return res.status(409).json({ message: 'Email already registered'});

  next();
};

const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token) return res.status(401).json({ message: 'no toke informed' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = findByEmail(payload.useremail);

    if(!user) return res.status(401).json({ message: 'user not found' });

    req.user = user;

    next();
  } catch(err) {
    return res.status(401).json({ message: 'seu toke é inválido' })
  }
}

module.exports = {
  isValidUser,
  authentication,
}