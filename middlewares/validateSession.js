const jwtToken = require('../services/jwtToken');

const token = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'missing auth token' });

  const tokenValidation = jwtToken.verify(authorization);

  if (!tokenValidation) return res.status(401).send({ message: 'jwt malformed' });

  req.user = tokenValidation.data.user;
  next();
};

module.exports = { token };
