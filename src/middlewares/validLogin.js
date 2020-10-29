const { errorsMessages } = require('../service');

const validLogin = (req, res, next) => {
  const { email, password } = req.body;

  switch (true) {
    case !email:
    case !password:
      return errorsMessages(res, 'All fields must be filled', 'unauthorized');
    default:
      next();
  }
};

module.exports = validLogin;
