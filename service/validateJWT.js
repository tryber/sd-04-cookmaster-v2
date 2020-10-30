const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    next();
  } catch (error) {
    console.log('erro validate', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
