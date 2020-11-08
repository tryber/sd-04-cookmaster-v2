module.exports = (res, statusCod, numError) => {
  const errors = {
    '1': {
      'message': 'Invalid entries. Try again.',
    },
  };

  res.status(statusCod).json(errors[numError]);
};
