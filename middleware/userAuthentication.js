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
  const token = req.headers.authorization;

  const data = jwt.verify(token, SECRET);

  if (!data) {
    return res.status(401).json({ message: 'Jet malformed' });
  }

  req.user = data;

  next();
};

module.exports = {
  validaJWT,
  createToken,
};
