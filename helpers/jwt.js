const jwt = require('jsonwebtoken');
const resp = require('../errorMsgs');

const secret = 'trybe_project';

const createJwt = ({ _id: id, email, role }) => {
  const payload = { id, email, role };
  const headers = { algorithm: 'HS256', expiresIn: '30m' };

  return jwt.sign(payload, secret, headers);
};

const verifications = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return resp(res, 401, 7);

  const payload = jwt.verify(token, secret);

  return payload;
};

const jwtVal = (req, res, next) => {
  try {
    const { id } = verifications(req, res);

    req.id = id;

    next();
  } catch (_) {
    resp(res, 401, 5);
  }
};

const jwtAdmVal = (req, res, next) => {
  try {
    const { id, role } = verifications(req, res);

    if (role !== 'admin') resp(res, 403, 8);

    req.id = id;
    req.role = 'admin';

    next();
  } catch (_) {
    resp(res, 401, 5);
  }
};

module.exports = {
  createJwt,
  jwtVal,
  jwtAdmVal,
};
