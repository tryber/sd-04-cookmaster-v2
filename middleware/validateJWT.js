const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const secret = 'opensecret';

const validateJwt = async (req, res, next) => {
  const token = req.headers;

  if (!token) {
    return res.status(401).json({ error: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const email = await UserModel.findEmail(decoded.data.email);
    if (!email) {
      return res.status(401).json({ message: 'EIncorrect username or password' });
    }
    req.user = email;

    next();
  } catch (er) {
    res.status(401).json({ error: 'jwt malformed' });
  }
};

module.exports = validateJwt;
