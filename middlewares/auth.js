const jwt = require('../services/createAndVerifyTokenJWT');

const validationAuth = async (req, res, next) => {
  const userLogin = await jwt.verifyToken(req.headers.authorization);
  const message = (req.method === 'PUT' || req.method === 'DELETE') && userLogin === false ? 'missing auth token' : 'jwt malformed';

  if(!userLogin) return res.status(401).json({ message });
  
  const { _id, email } = userLogin;
  req.user = { _id, email }
  
  return next();
};

module.exports = { validationAuth };
