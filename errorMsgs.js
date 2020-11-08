module.exports = (res, statusCod, numError) => {
  const errors = {
    1: {
      message: 'Invalid entries. Try again.',
    },
    2: {
      message: 'Email already registered',
    },
  };

  res.status(statusCod).json(errors[numError]);
};
