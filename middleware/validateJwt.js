const { getUserEmailMod } = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const secret = 'cookmasterv2';

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const verify = jwt.verify(token, secret);

    const user = await getUserEmailMod(verify.email);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
