const jwt = require('../helpers/jwt');
const resp = require('../errorMsgs');

module.exports = (req, res) => {
  const token = jwt.create(req.user);

  resp(res, 200, null, { token });
};
