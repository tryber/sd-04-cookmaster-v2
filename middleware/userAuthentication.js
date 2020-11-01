const jwt = require('jsonwebtoken');

const SECRET = 'trybe2020';

function createToken(payload) {
  const headers = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, headers);

  return token;
}

const validaJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, SECRET);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validaJWT,
  createToken,
};
