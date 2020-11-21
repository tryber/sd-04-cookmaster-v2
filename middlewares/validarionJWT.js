const jwt = require('jsonwebtoken');
const userModel = require('../models/genericModel');

const secret = 'segredo';

const validJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({ message: 'jwt malformed' });
  try {
    const email = jwt.verify(token, secret);
    const user = await userModel.findOne('users', { email: email.email });
    if (!user) res.status(401).json({ message: 'jwt malformed' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validJwt,
};
