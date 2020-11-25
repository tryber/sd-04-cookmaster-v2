const jwt = require('jsonwebtoken');
const { secret } = require('../config/Auth');

const auth = (request, response, next) => {
  const { authorization } = request.headers;

  try {
    if (!authorization) {
      return request.status(401).json({ message: 'missing auth token' });
    }

    const tokenParts = authorization.split(' ');
    if (!(tokenParts.length === 2)) {
      return response.status(401).json({ message: 'jwt malformed' });
    }
    const [schema, token] = tokenParts;
    if (!/^Bearer$/i.test(schema)) {
      return response.status(401).json({ message: 'token unformatted' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return response.status(401).json({ message: 'token invalid' });
      }
      request.user = decoded;
      return next();
    });
  } catch (error) {
    return response.status(401).json({ message: 'missing auth token' });
  }

};

module.exports = {
  auth,
};
