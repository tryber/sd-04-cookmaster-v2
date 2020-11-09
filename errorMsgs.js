module.exports = (res, statusCod, numError, o) => {
  const errors = {
    1: {
      message: 'Invalid entries. Try again.',
    },
    2: {
      message: 'Email already registered',
    },
    3: {
      message: 'All fields must be filled',
    },
    4: {
      message: 'Incorrect username or password',
    },
  };

  numError ? res.status(statusCod).json(errors[numError]) : res.status(statusCod).json(o);
};
