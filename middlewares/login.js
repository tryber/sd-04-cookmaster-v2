const { createJwt } = require('../helpers/jwt');
const resp = require('../errorMsgs');

module.exports = (req, res) => {
  const token = createJwt(req.user);

  resp(res, 200, null, { token });
};
