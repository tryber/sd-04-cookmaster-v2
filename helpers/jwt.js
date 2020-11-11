const jwt = require('jsonwebtoken');
const resp = require('../errorMsgs');

const secret = 'trybe_project';

const create = ({ _id: id, email, role }) => {
  const payload = { id, email, role };
  const headers = { algorithm: 'HS256', expiresIn: '30m' };

  return jwt.sign(payload, secret, headers);
};

const val = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return resp(res, 401, 7);

    const payload = jwt.verify(token, secret);

    req.id = payload.id;

    next();
  } catch (_) {
    resp(res, 401, 5);
  }
};

module.exports = {
  create,
  val,
};
