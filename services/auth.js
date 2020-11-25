const jwt = require('jsonwebtoken');
const { secret } = require('../config/Auth');

const auth = (request, response, next) => {
  const { authorization } = request.headers;
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
};

module.exports = {
  auth,
};


/* const jwt = require('jsonwebtoken');
const usersModel = require('../model/UserModel');
const { secret } = require('../config/Auth');

const auth = async (req, res, next) => {
  //const secret = 'secrecttoken';
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    console.log(secret);

    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await usersModel.findByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  auth,
}; */
