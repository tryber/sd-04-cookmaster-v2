const jwt = require('jsonwebtoken');
const { secret } = require('../config/Auth');

const GenerateToken = ({ _id, email, role }) =>
  jwt.sign({ _id, email, role }, secret, { expiresIn: 86400 });

module.exports = { GenerateToken };
