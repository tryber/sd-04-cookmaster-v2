const notFound = (req, res) =>
  res.status(404).json({
    err: {
      code: 'not_found',
      message: `${req.baseUrl} not found`,
    },
  });

const internal = (err, _, res, _next) =>
  res.status(500).json({
    err: {
      code: 'internal_error',
      message: err.message,
    },
  });

module.exports = {
  notFound,
  internal,
};
