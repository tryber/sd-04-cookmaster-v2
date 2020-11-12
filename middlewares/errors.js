const resp = require('../errorMsgs');

const internal = (err, _, res, _next) => {
  const o = {
    code: 'internal_error',
    message: err.message,
    error: err,
  };

  resp(res, 500, null, o);
};

const notFound = (req, res) => {
  const o = {
    code: 'not_found',
    message: `${req.baseUrl} not found`,
  };

  resp(res, 404, null, o);
};

module.exports = {
  internal,
  notFound,
};
