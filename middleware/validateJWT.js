const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const secret = 'opensecret';

const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const email = await UserModel.findEmail(decoded.data.email);
    if (!email) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    req.user = email;

    next();
  } catch (er) {
    console.log(er);
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJwt;
