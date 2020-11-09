const createJwt = require('../helpers/createJwt');
const resp = require('../errorMsgs');

module.exports = (req, res) => {
  const token = createJwt(req.user);

  resp(res, 200, null, { token });
};
