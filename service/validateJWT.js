const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log('tokennnnnnn', token);
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const data = jwt.verify(token, secret);
    // console.log('dataaaaaa', data);

    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
